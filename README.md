# fast-form

FastForm 是一个基于 vue3 和 json schema 的表单组件库，,目前拥有 String、Number、Object、Array、Boolean 和 Integer 类型的组件。它支持自定义校验表单、自定义主题、自定义组件和自定义 format 等功能。
FastForm is a form component library based on vue3 and json schema,and currently has components of types String, Number, Object, Array, Boolean, and Integer.It supports functions such as custom checklists, custom themes, custom components and custom formats

## API

```jsx
<ThemeProvider theme={theme as any}>
    <FastForm
        schema={schema}
        uiSchema={uiSchema}
        value={data}
        onChange={handleChange}
        contextRef={contextRef}
        customValidate={customValidate}
        customFormats={format}
    ></FastForm>
</ThemeProvider>
```

theme: 我们提供了一套默认的主题，你也可以根据自己的需求制定一套自己的主题，并按照要求通过 theme 传入

```ts
{
  widgets: {
    SelectionWidget: SelectionWidget,
    TextWidget: TextWidget,
    NumberWidget: NumberWidget,
    BooleanWidget: BooleanWidget,
    IntegerWidget: IntegerWidget,
  },
};
```

schema: json schema 对象，用来定义表单

uiSchema: 对表单进行自定义展示，示例如下

```ts
export type UISchema = {
  widget?: string | CommonWidgetDefine;
  properties?: {
    [key: string]: UISchema;
  };
  items?: UISchema | UISchema[];
} & {
  [key: string]: any;
};
```

value: 表单的数据结果

onChange: 表单数据变化的回调方法,示例如下

```ts
const handleChange = (v: any) => {
  console.log(v); // v为改变后的新值
};
```

contextRef: 传入一个 Ref,我们会在此 ref 上挂载方法，实现表单的校验功能，在需要触发校验时，执行示例中的 verify()，返回的 res 为校验结果

```ts
const contextRef = ref();

const verify = () => {
  contextRef.value.doValidate().then((res: any) => {
    console.log(res);
  });
};
```

customValidate:自定义校验的方法，支持异步校验，示例如下

```ts
customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.password !== data.confirmPassword) {
          errors.confirmPassword.addError("密码必须一致!");
        }
        resolve(true);
      }, 1000);
    });
}
```

customFormats:自定义 format,示例如下

```ts
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
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
