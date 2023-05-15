import { defineComponent } from "vue";
import { CommonWidgetPropsDefine, CustomFormat } from "../../lib/types";
import { withFormItem } from "../../lib/theme/FormItem";

const format: CustomFormat = {
  name: "color",
  definition: {
    type: "string",
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: "ColorWidget",
      props: CommonWidgetPropsDefine,
      setup(props) {
        const handleChange = (e: any) => {
          props.onChange(e.target.value);
        };
        return () => {
          return (
            <input type="color" value={props.value} onInput={handleChange} />
          );
        };
      },
    }),
  ),
};

export default format;
