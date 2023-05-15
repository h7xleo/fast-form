export default {
  name: "array",
  schema: {
    type: "array",
    items: [
      {
        type: "string",
        minLength: 3,
        title: "title",
      },
      {
        type: "array",
        items: { type: "string" },
      },
      {
        type: "array",
        items: { type: "string", enum: ["apple", "bananer"] },
        title: "枚举多选",
      },
    ],
  },
  uiSchema: {},
  default: ["array", ["test"]],
};
