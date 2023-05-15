import { CommonWidgetPropsDefine } from "../../lib/types";
import { defineComponent } from "vue";
import { withFormItem } from "../../lib/theme/FormItem";

export default withFormItem(
  defineComponent({
    name: "PasswordWidget",
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        props.onChange(e.target.value);
      };
      return () => {
        return (
          <input
            class="input"
            type="password"
            value={props.value}
            onInput={handleChange}
            style={{ width: "100%", height: "20px" }}
          />
        );
      };
    },
  }),
);
