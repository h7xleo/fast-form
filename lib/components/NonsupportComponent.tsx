import { defineComponent } from "vue";

export default defineComponent({
  name: "NonsupportComponent",
  setup() {
    return () => {
      return (
        <div>
          抱歉，fast-form暂不支持该类型组件，请选择其他方式实现，如自定义组件
        </div>
      );
    };
  },
});
