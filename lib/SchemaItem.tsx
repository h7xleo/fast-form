import { computed, defineComponent } from "vue";
import { SchemaType, ComponentPropsDefault } from "./types";
import { retrieveSchema } from "./utils";
import StringComponet from "./components/StringComponent.vue";
import NumberComponet from "./components/NumberComponent.vue";
import ObjectComponent from "./components/ObjectComponent";
import ArrayComponent from "./components/ArrayComponent";
import BooleanComponent from "./components/BooleanComponent.vue";
import IntegerComponent from "./components/IntegerComponent.vue";
import NonsupportComponent from "./components/NonsupportComponent";

export default defineComponent({
  name: "SchemaItem",
  props: ComponentPropsDefault,
  setup(props) {
    // 对Json schema 进行转换处理
    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    });

    return () => {
      const type = props.schema?.type;
      if (!type) {
        throw new Error("type is a required field");
      }
      let component: any;
      switch (type) {
        case SchemaType.STRING:
          component = StringComponet;
          break;
        case SchemaType.NUMBER:
          component = NumberComponet;
          break;
        case SchemaType.OBJECT:
          component = ObjectComponent;
          break;
        case SchemaType.ARRAY:
          component = ArrayComponent;
          break;
        case SchemaType.BOOLEAN:
          component = BooleanComponent;
          break;
        case SchemaType.INTEGER:
          component = IntegerComponent;
          break;
        default:
          component = NonsupportComponent;
      }
      return (
        <component {...props} schema={retrieveSchemaRef.value}></component>
      );
    };
  },
});
