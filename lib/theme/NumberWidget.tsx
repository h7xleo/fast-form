import { CommonWidgetPropsDefine } from "../types";
import { defineComponent } from "vue";
import { withFormItem } from "./FormItem";

export default withFormItem(
  defineComponent({
    name: "NumberWidget",
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const num = Number(e.target.value);
        if (Number.isNaN(num)) {
          props.onChange(undefined);
        } else {
          props.onChange(num);
        }
      };
      return () => {
        return (
          <input
            class="input"
            type="number"
            value={props.value}
            onInput={handleChange}
            style={{ width: "100%", height: "20px" }}
          />
        );
      };
    },
  }),
);
