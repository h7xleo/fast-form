import { CommonWidgetPropsDefine } from "../types";
import { defineComponent } from "vue";
import { withFormItem } from "./FormItem";

export default withFormItem(
  defineComponent({
    name: "TextWidget",
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        props.onChange(e.target.value);
      };
      return () => {
        return (
          <input
            class="input"
            type="text"
            value={props.value}
            onInput={handleChange}
            style={{ width: "100%", height: "20px" }}
          />
        );
      };
    },
  }),
);
