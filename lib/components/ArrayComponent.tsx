import { PropType, computed, defineComponent } from "vue";
import { ComponentPropsDefault } from "../types";
import { useInject } from "../provide";
import { JsonSchema, SelectionWidgetNames } from "../types";
import { createUseStyles } from "vue-jss";
import { getWidget } from "../theme";
// import Selection from "../widgets/Selection";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    border: "1px solid #eee",
    overflow: "hidden",
  },
  actions: {
    background: "#eee",
    padding: 10,
    textAlign: "right",
  },
  action: {
    padding: "2px 10px",
    "& + &": {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
});

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles();
    const handleAdd = () => props.onAdd(props.index);
    const handleDelete = () => props.onDelete(props.index);
    const handleUp = () => props.onUp(props.index);
    const handleDown = () => props.onDown(props.index);
    return () => {
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});
/**
 * {
 *   items: {type:string}
 * }
 *
 * {
 *   items: [{type:string},{type:number}]
 * }
 *
 * {
 *   items: {type:string,enum:['1','2']}
 * }
 */

export default defineComponent({
  name: "ArrayComponent",
  props: ComponentPropsDefault,
  setup(props) {
    const selectionRef = computed(() => {
      const widgetRef = getWidget(SelectionWidgetNames.SelectionWidget, props);
      return widgetRef.value;
    });
    // 依赖注入
    const injected = useInject();
    // 改变value的值
    const handleValueChange = (index: number, data: any) => {
      const value = Array.isArray(props.value) ? props.value : [];
      value[index] = data;
      // 向上触发onChange事件
      props.onChange(value);
    };

    // 单类型数组顺序及长度修改 handleAdd handleDelete handleUp handleDown
    const handleAdd = (index: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      value.splice(index + 1, 0, undefined);
      // 向上触发onChange事件
      props.onChange(value);
    };
    const handleDelete = (index: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      value.splice(index, 1);
      // 向上触发onChange事件
      props.onChange(value);
    };
    const handleUp = (index: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      if (!value[index - 1]) return;
      const pre = value[index - 1];
      value.splice(index - 1, 1, value[index]);
      value.splice(index, 1, pre);
      // 向上触发onChange事件
      props.onChange(value);
    };
    const handleDown = (index: number) => {
      const value = Array.isArray(props.value) ? props.value : [];
      if (!value[index + 1]) return;
      const next = value[index + 1];
      value.splice(index + 1, 1, value[index]);
      value.splice(index, 1, next);
      // 向上触发onChange事件
      props.onChange(value);
    };

    return () => {
      const { SchemaItem } = injected;
      const SelectionWidget = selectionRef.value;
      const { schema, rootSchema, value, errorSchema, uiSchema } = props;
      const itemsIsArray = Array.isArray(schema!.items);
      const itemsIsSelect = schema?.items && (schema as any).items.enum;

      if (itemsIsArray) {
        // 当items是数组的情况
        const items: JsonSchema[] = schema!.items as JsonSchema[];
        const currentValue = Array.isArray(value) ? value : [];
        return items.map((item: JsonSchema, index: number) => {
          const itemsUISchema = uiSchema?.items;
          const us = Array.isArray(itemsUISchema)
            ? itemsUISchema[index] || {}
            : itemsUISchema || {};
          return (
            <SchemaItem
              schema={item}
              uiSchema={us}
              rootSchema={rootSchema}
              value={currentValue[index]}
              onChange={(v: any) => handleValueChange(index, v)}
              errorSchema={errorSchema[index] || {}}
              key={index}
            />
          );
        });
      } else if (!itemsIsSelect) {
        // 当items是单类型的情况
        const currentValue = Array.isArray(value) ? value : [];
        return currentValue.map((item: any, index: number) => (
          <ArrayItemWrapper
            index={index}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              schema={schema?.items as JsonSchema}
              uiSchema={(uiSchema?.items as any) || {}}
              rootSchema={rootSchema}
              value={item}
              onChange={(v: any) => handleValueChange(index, v)}
              errorSchema={errorSchema[index] || {}}
              key={index}
            />
          </ArrayItemWrapper>
        ));
      } else {
        const enums = (schema as any).items.enum;
        const options = enums.map((item: any) => ({
          key: item,
          value: item,
        }));
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={value}
            options={options}
            errors={errorSchema.__errors}
            schema={schema}
          ></SelectionWidget>
        );
      }
    };
  },
});

export { ArrayItemWrapper };
