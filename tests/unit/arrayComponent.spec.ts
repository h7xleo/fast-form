import { mount } from "@vue/test-utils";
import {
  NumberComponent,
  StringComponent,
  ArrayComponent,
  ArrayItemWrapper,
  Selection,
} from "../../lib";
import TestComponent from "./utils/TestComponent";

describe("ArrayComponent", () => {
  it("Multitype array rendering", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: [{ type: "string" }, { type: "number" }],
        },
        value: ["test", 1],
        onChange: () => {},
      },
    });

    const arrComponent = wrapper.findComponent(ArrayComponent);
    const strComponent = arrComponent.findComponent(StringComponent);
    const numComponent = arrComponent.findComponent(NumberComponent);
    expect(strComponent.exists()).toBeTruthy();
    expect(numComponent.exists()).toBeTruthy();
  });

  it("Single type rendering", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: { type: "string" },
        },
        value: ["test1", "test2"],
        onChange: () => {},
      },
    });

    const arrComponent = wrapper.findComponent(ArrayComponent);
    const strComponents = arrComponent.findAllComponents(StringComponent);
    expect(strComponents.length).toBe(2);
    expect(strComponents[0].props("value")).toBe("test1");
  });

  it("Single type rendering", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: { type: "string", enum: ["a", "b", "c"] },
        },
        value: [],
        onChange: () => {},
      },
    });

    const arrComponent = wrapper.findComponent(ArrayComponent);
    const seleComponent = arrComponent.findComponent(Selection);
    expect(seleComponent.exists()).toBeTruthy();
  });

  it("The event that changes the value", () => {
    let value: any = [];
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: [{ type: "string" }, { type: "number" }],
        },
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const arrComponent = wrapper.findComponent(ArrayComponent);
    const strComponent = arrComponent.findComponent(StringComponent);
    const numComponent = arrComponent.findComponent(NumberComponent);
    strComponent.props("onChange")("test");
    numComponent.props("onChange")(1);
    expect(value[0]).toBe("test");
    expect(value[1]).toBe(1);
  });

  it("The addition, deletion, and modification of a single type array", () => {
    let value = ["a", "b", "c"];
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: { type: "string" },
        },
        value: value,
        onChange: () => {},
      },
    });
    const arrComponent = wrapper.findComponent(ArrayComponent);
    const arrItemWrapper = arrComponent.findComponent(ArrayItemWrapper);
    arrItemWrapper.props("onAdd")(0);
    expect(value.length).toBe(4);
    expect(value[1]).toBeUndefined();
    arrItemWrapper.props("onDelete")(1);
    expect(value.length).toBe(3);
    expect(value[1]).toBe("b");
    arrItemWrapper.props("onUp")(1);
    expect(value[0]).toBe("b");
    expect(value[1]).toBe("a");
    arrItemWrapper.props("onDown")(0);
    expect(value[0]).toBe("a");
    expect(value[1]).toBe("b");
  });
});
