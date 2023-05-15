import { mount } from "@vue/test-utils";
import { NumberComponent, BooleanComponent, IntegerComponent } from "../../lib";
import TestComponent from "./utils/TestComponent";

describe("SchemaForm", () => {
  it("should render correct number component", async () => {
    let value = "";
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "number",
        },
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const numberComponent = wrapper.findComponent(NumberComponent);
    expect(numberComponent.exists()).toBeTruthy();
    const input = numberComponent.find("input");
    input.element.value = "1";
    input.trigger("input");
    expect(value).toBe(1);
  });

  it("should render correct boolean component", async () => {
    let value = true;
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "boolean",
        },
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const booleanComponent = wrapper.findComponent(BooleanComponent);
    expect(booleanComponent.exists()).toBeTruthy();
    await booleanComponent.props("onChange")(false);
    expect(value).toBe(false);
  });

  it("should render correct integer component", async () => {
    let value = 0;
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "integer",
        },
        value: value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const integerComponent = wrapper.findComponent(IntegerComponent);
    expect(integerComponent.exists()).toBeTruthy();
    await integerComponent.props("onChange")(1);
    expect(value).toBe(1);
  });
});
