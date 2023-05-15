import {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  computed,
  defineComponent,
  inject,
  provide,
  ref,
} from "vue";
import {
  Theme,
  SelectionWidgetNames,
  CommonWigetNames,
  CommonWidgetDefine,
  ComponentPropsDefault,
} from "./types";
import { ThemeKey, useInject } from "./provide";
import { isObject } from "./utils";

export default defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const theme = computed(() => props.theme);
    provide(ThemeKey, theme);

    return () => {
      return slots.default && slots.default();
    };
  },
});

export function getWidget<T extends SelectionWidgetNames | CommonWigetNames>(
  name: T,
  props?: ExtractPropTypes<typeof ComponentPropsDefault>,
) {
  if (props) {
    const formatInject = useInject();
    const { uiSchema, schema } = props;
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine);
    }
    if (schema?.format) {
      if (formatInject.formatMapRef.value[schema.format]) {
        return ref(formatInject.formatMapRef.value[schema.format]);
      }
    }
  }

  const themeInject: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(ThemeKey);

  if (!themeInject) {
    throw new Error("The theme field is required");
  }

  const widget = computed(() => {
    return themeInject.value.widgets[name];
  });

  return widget;
}
