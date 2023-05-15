import { mount } from "@vue/test-utils";
import { NumberComponent, StringComponent } from "../../lib";
import TestComponent from "./utils/TestComponent";

describe("ObjectComponent", () => {
  let schema: any;
  beforeEach(() => {
    schema = {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        age: {
          type: "number",
        },
      },
    };
  });
  it("Render the properties of the object correctly to the corresponding node", async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: {},
        onChange: (v: any) => {
          v;
        },
      },
    });

    const numComponent = wrapper.findComponent(NumberComponent);
    const strComponent = wrapper.findComponent(StringComponent);

    expect(numComponent.exists()).toBeTruthy();
    expect(strComponent.exists()).toBeTruthy();
  });

  it("The value of the node will change", async () => {
    let value: any = {};
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const numComponent = wrapper.findComponent(NumberComponent);
    const strComponent = wrapper.findComponent(StringComponent);

    await numComponent.props("onChange")(1);
    expect(value.age).toEqual(1);
    await strComponent.props("onChange")("test");
    expect(value.name).toEqual("test");
  });

  it("If the value does not exist, the corresponding attribute is deleted", async () => {
    let value: any = { name: "123" };
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });
    const strComponent = wrapper.findComponent(StringComponent);
    await strComponent.props("onChange")(undefined);
    expect(value.name).toBeUndefined();
  });

  it("value is not an object", async () => {
    let value: any;
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });
    const strComponent = wrapper.findComponent(StringComponent);
    await strComponent.props("onChange")("test");
    expect(value.name).toBe("test");
  });

  it("properties is not defined", async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "object",
        },
        value: {},
        onChange: (v: any) => {
          v;
        },
      },
    });
  });
});
