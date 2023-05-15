import { PropType, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SelectionWidget",
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true,
    },
  },
  setup(props) {
    const currentValue = ref(props.value);
    watch(currentValue, (newV, preV) => {
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
});
