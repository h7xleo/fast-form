import { defineComponent, ref, Ref, watchEffect, reactive } from "vue";
import appStyle from "./styleJs/appStyle";
import MonacoEditor from "./components/MonacoEditor";
import demos from "./demo/index";
import FastForm, { ThemeProvider } from "../lib/index";
import theme from "../lib/theme/index";
import format from "./plugins/customFormat";

type Schema = any;
type UISchema = any;

function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

export default defineComponent({
  setup() {
    const selectRef: Ref<number> = ref(0);
    const classesRef = appStyle();
    // const methodRef: Ref<any> = ref();
    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
      customValidate: ((data: any, errors: any) => void) | undefined;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: null,
      schemaCode: "",
      dataCode: "",
      uiSchemaCode: "",
      customValidate: undefined,
    });

    watchEffect(() => {
      const index = selectRef.value;
      const currentItem: any = demos[index];
      demo.schema = currentItem.schema;
      demo.data = currentItem.default;
      demo.uiSchema = currentItem.uiSchema;
      demo.schemaCode = toJson(currentItem.schema);
      demo.dataCode = toJson(currentItem.default);
      demo.uiSchemaCode = toJson(currentItem.uiSchema);
      demo.customValidate = currentItem.customValidate;
    });

    const handleChange = (v: any) => {
      demo.data = v;
      demo.dataCode = toJson(v);
    };
    const handleCodeChange = (
      type: "schema" | "data" | "uiSchema",
      value: string,
    ) => {
      try {
        const json = JSON.parse(value);
        demo[type] = json;
        (demo as any)[`${type}Code`] = value;
      } catch (err) {
        return;
      }
    };

    const handleSchemaChange = (v: string) => handleCodeChange("schema", v);
    const handleDataChange = (v: string) => handleCodeChange("data", v);
    const handleUISchemaChange = (v: string) => handleCodeChange("uiSchema", v);

    const contextRef = ref();

    const verify = () => {
      contextRef.value.doValidate().then((res: any) => {
        console.log(res);
      });
    };

    return () => {
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.title}>Fast-Form</div>
          <div class={classes.menu}>
            <div>
              {demos.map((item, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selectRef.value,
                  }}
                  onClick={() => (selectRef.value = index)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                class={classes.codePanel}
                code={demo.schemaCode}
                onChange={handleSchemaChange}
                title="Schema"
              ></MonacoEditor>
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.uiSchemaCode}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                ></MonacoEditor>
                <MonacoEditor
                  class={classes.codePanel}
                  code={demo.dataCode}
                  onChange={handleDataChange}
                  title="Data"
                ></MonacoEditor>
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={theme as any}>
                <FastForm
                  schema={demo.schema}
                  uiSchema={demo.uiSchema || {}}
                  value={demo.data}
                  onChange={handleChange}
                  contextRef={contextRef}
                  customValidate={demo.customValidate}
                  customFormats={format}
                ></FastForm>
              </ThemeProvider>
              <button class={classes.button} onClick={verify}>
                校验
              </button>
            </div>
          </div>
        </div>
      );
    };
  },
});
