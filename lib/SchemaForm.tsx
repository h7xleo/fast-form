import {
  PropType,
  Ref,
  defineComponent,
  provide,
  shallowRef,
  watch,
  watchEffect,
  ref,
  computed,
} from "vue";
import {
  CommonWidgetDefine,
  CustomFormat,
  JsonSchema,
  UISchema,
} from "./types";
import { SchemaFormKey } from "./provide";
import SchemaItem from "./SchemaItem";
import Ajv, { Options } from "ajv";
import { validatorFormData, ErrorSchema } from "./validator";

interface ContextRef {
  doValidate: () => Promise<{
    valid: boolean;
    errors: any[];
  }>;
}

const defaultAjvOptions = {
  allErrors: true,
  jsPropertySyntax: true,
};

export default defineComponent({
  name: "FastForm",
  props: {
    schema: {
      type: Object as PropType<JsonSchema>,
      require: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    language: {
      type: String,
      default: "zh",
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
  },
  setup(props) {
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        return customFormats.reduce((reslut, format) => {
          reslut[format.name] = format.component;
          return reslut;
        }, {} as { [key: string]: CommonWidgetDefine });
      } else {
        return {};
      }
    });
    // 依赖注入
    provide(SchemaFormKey, { SchemaItem, formatMapRef });

    // ajv
    const validatorRef: Ref<Ajv> = shallowRef() as any;
    // 校验错误信息
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({});

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      });

      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        customFormats.forEach((item) => {
          validatorRef.value.addFormat(item.name, item.definition);
        });
      }
    });

    const validateResolveRef = ref();
    const validateResolveIndex = ref(0);

    async function doValidate() {
      const index = (validateResolveIndex.value += 1);
      const result = await validatorFormData(
        validatorRef.value,
        props.value,
        props.schema!,
        props.language,
        props.customValidate,
      );

      if (index !== validateResolveIndex.value) return;

      errorSchemaRef.value = result.errorSchema;

      validateResolveRef.value(result);
      validateResolveRef.value = undefined;
    }

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate();
        }
      },
      { deep: true },
    );

    // 表单校验
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve;
                doValidate();
              });
            },
          };
        }
      },
      {
        immediate: true,
      },
    );

    return () => {
      const { schema, value, uiSchema } = props;
      // 对事件加一层处理
      const handleChange = (v: any) => {
        return props.onChange(v);
      };
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
          uiSchema={uiSchema || {}}
        ></SchemaItem>
      );
    };
  },
});
