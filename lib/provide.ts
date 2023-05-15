import { inject, Ref } from "vue";
import { CommonWidgetDefine, ComponentDefine } from "./types";

// provide inject 依赖注入 key
export const SchemaFormKey = Symbol();
export const ThemeKey = Symbol();

// 公共的获取依赖注入值的函数
export function useInject() {
  const injected:
    | {
        SchemaItem: ComponentDefine;
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>;
      }
    | undefined = inject(SchemaFormKey);
  if (!injected) {
    throw new Error("SchemaForm should be used");
  }
  return injected;
}
