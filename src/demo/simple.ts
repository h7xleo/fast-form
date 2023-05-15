import PasswordWidget from "@/components/PasswordWidget";

export default {
  name: "Login",
  schema: {
    description: "a simple for exmple",
    type: "object",
    required: ["account", "password", "confirmPassword"],
    properties: {
      account: {
        type: "string",
        title: "账号",
        minLength: 3,
      },
      password: {
        type: "string",
        title: "密码",
      },
      confirmPassword: {
        type: "string",
        title: "确认密码",
      },
      infor: {
        type: "object",
        properties: {
          remark: {
            type: "string",
            title: "描述",
          },
          hobby: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      flag: {
        type: "boolean",
        title: "switch开关",
      },
      num: {
        type: "integer",
        title: "滑块",
      },
    },
  },
  uiSchema: {
    properties: {
      password: {
        widget: PasswordWidget,
      },
      confirmPassword: {
        widget: PasswordWidget,
      },
    },
  },
  default: {
    infor: {
      hobby: [""],
    },
  },
  customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.password !== data.confirmPassword) {
          errors.confirmPassword.addError("密码必须一致!");
        }
        resolve(true);
      }, 1000);
    });
  },
};
