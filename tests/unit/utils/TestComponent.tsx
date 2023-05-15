import { defineComponent, PropType } from "vue";
import SchemaForm, { JsonSchema } from "../../../lib";
import theme from "../../../lib/theme/index";
import { ThemeProvider } from "../../../lib";

export default defineComponent({
  name: "TestComponent",
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
  },
  setup(props) {
    return () => {
      return (
        <ThemeProvider theme={theme as any}>
          <SchemaForm {...props}></SchemaForm>
        </ThemeProvider>
      );
    };
  },
});
