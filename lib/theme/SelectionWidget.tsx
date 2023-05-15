import { defineComponent, ref, watch } from "vue";
import { SelectionWidgetPropsDefine } from "../types";
import { withFormItem } from "./FormItem";

export default withFormItem(
  defineComponent({
    name: "SelectionWidget",
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const currentValue = ref(props.value);
      watch(currentValue, (newV) => {
        if (newV !== props.value) {
          props.onChange(newV);
        }
      });
      watch(
        () => props.value,
        (v) => {
          if (v !== currentValue.value) {
            currentValue.value = v;
          }
        },
      );

      return () => {
        const optionsArr = props.options;
        return (
          <select multiple={true} v-model={currentValue.value}>
            {optionsArr.map((item) => (
              <option value={item.value}>{item.key}</option>
            ))}
          </select>
        );
      };
    },
  }),
);
