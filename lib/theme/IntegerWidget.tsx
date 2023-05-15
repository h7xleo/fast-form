import { defineComponent } from "vue";
import { withFormItem } from "./FormItem";
import { CommonWidgetPropsDefine } from "../types";

export default withFormItem(
  defineComponent({
    name: "IntegerWidget",
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const v = e.target.value;
        props.onChange(+v);
      };
      return () => {
        let { maximum, minimum } = props.schema;
        if (!maximum) maximum = 100;
        if (!minimum) minimum = 0;
        return (
          <input
            type="range"
            min={minimum}
            max={maximum}
            value={props.value}
            onInput={handleChange}
            style={{ width: "100%" }}
          />
        );
      };
    },
  }),
);
