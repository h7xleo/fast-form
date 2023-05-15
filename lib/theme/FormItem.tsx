import { CommonWidgetPropsDefine } from "../types";
import { defineComponent } from "vue";
import { createUseStyles } from "vue-jss";

const useStyle = createUseStyles({
  container: {
    padding: "10px 0",
  },
  label: {
    display: "block",
    color: "#777",
    fontSize: 14,
    lineHeight: "16px",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

const FormItem = defineComponent({
  name: "FormItem",
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyle();
    return () => {
      const { schema, errors } = props;
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema!.title}</label>
          {slots.default && slots.default()}
          {errors?.map((item) => (
            <p class={classes.errorText}>{item}</p>
          ))}
        </div>
      );
    };
  },
});

export default FormItem;

export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapper${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} {...slots}></Widget>
          </FormItem>
        );
      };
    },
  });
}
