import { computed, defineComponent } from "vue";
import { withFormItem } from "./FormItem";
import { CommonWidgetPropsDefine } from "../types";
import { createUseStyles } from "vue-jss";

export default withFormItem(
  defineComponent({
    name: "BooleanWidget",
    props: CommonWidgetPropsDefine,
    setup(props) {
      const classRef = styles();
      const value = computed(() => {
        return props.value;
      });
      const handleClick = () => {
        const v = !value.value;
        props.onChange(v);
      };
      return () => {
        const classes = classRef.value;
        return (
          <div
            class={{ [classes.container]: true, [classes.action]: value.value }}
            onClick={handleClick}
          >
            {/* 滑块 */}
            <div
              class={[
                classes.slider,
                value.value ? classes.moveToRight : classes.moveToLeft,
              ]}
            ></div>
          </div>
        );
      };
    },
  }),
);

const styles = createUseStyles({
  container: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    cursor: "pointer",
  },
  action: {
    backgroundColor: "rgba(31,200,83,1)",
  },
  slider: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "#fff",
    transition: "all 0.3s",
  },
  moveToRight: {
    transform: "translateX(20px)",
  },
  moveToLeft: {
    transform: "translateX(0px)",
  },
});
