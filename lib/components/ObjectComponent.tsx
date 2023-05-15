import { defineComponent } from "vue";
import { ComponentPropsDefault } from "../types";
import { useInject } from "../provide";
import { isObject } from "../utils";

export default defineComponent({
  name: "ObjectComponent",
  props: ComponentPropsDefault,
  setup(props) {
    // 获取注入的依赖
    const injected = useInject();

    const handleValueChange = (key: string, data: any) => {
      const value: any = isObject(props.value) ? props.value : {};
      if (data === undefined) {
        // 值不存在就删除
        delete value[key];
      } else {
        value[key] = data;
      }

      // 向上触发onChange事件
      props.onChange(value);
    };

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props;
      const properties = schema?.properties || {};
      const { SchemaItem } = injected;
      // 判断value是否为object
      const currentValue: any = isObject(value) ? value : {};
      return Object.keys(properties).map((item: string, index: number) => (
        <SchemaItem
          schema={properties[item]}
          rootSchema={rootSchema}
          value={currentValue[item]}
          onChange={(v: any) => handleValueChange(item, v)}
          errorSchema={errorSchema[item] || {}}
          uiSchema={uiSchema?.properties ? uiSchema.properties[item] || {} : {}}
          key={index}
        />
      ));
    };
  },
});
