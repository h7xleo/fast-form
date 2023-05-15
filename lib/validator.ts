import Ajv, { ErrorObject } from "ajv";
import { JsonSchema } from "./types";
import i18n from "ajv-i18n";
import toPath from "lodash.topath";
import { isObject } from "./utils";

interface TransformErrorObject {
  name: string;
  property: string;
  message: string | undefined;
  params: Record<string, any>;
  schemaPath: string;
}

export type ErrorSchema = {
  [level: string]: ErrorSchema;
} & {
  __errors?: string[];
};
function toErrorSchema(errors: TransformErrorObject[]) {
  if (errors.length < 1) return {};
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = toPath(property);
    let parent = errorSchema;

    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        (parent as any)[segment] = {};
      }
      parent = parent[segment as keyof typeof parent];
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || "");
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }

    return errorSchema;
  }, {} as ErrorSchema);
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): TransformErrorObject[] {
  if (errors === null || errors === undefined) return [];

  return errors.map(
    ({ message, instancePath, keyword, params, schemaPath }) => {
      return {
        name: keyword,
        property: `${instancePath}`,
        message,
        params,
        schemaPath,
      };
    },
  );
}

export async function validatorFormData(
  validator: Ajv,
  formData: any,
  schema: JsonSchema,
  language: string,
  customValidate?: (data: any, errors: any) => void,
) {
  let validationError = null;
  try {
    validator.validate(schema, formData);
  } catch (err) {
    validationError = err;
  }

  i18n[language as keyof typeof i18n](validator.errors);

  let errors = transformErrors(validator.errors);
  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError,
      } as TransformErrorObject,
    ];
  }

  const errorSchema = toErrorSchema(errors);

  if (customValidate === undefined) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    };
  }

  const proxy = createErrorProxy();
  await customValidate(formData, proxy);
  const newErrorSchema = mergetObjects(errorSchema, proxy, true);
  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0,
  };
}

function createErrorProxy() {
  const raw = {};
  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === "addError") {
        return (msg: string) => {
          const __errors = Reflect.get(target, "__errors", reciver);
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg);
          } else {
            (target as any).__errors = [msg];
          }
        };
      }
      const res = Reflect.get(target, key, reciver);
      if (res === undefined) {
        const p: any = createErrorProxy();
        (target as any)[key] = p;
        return p;
      }
      return res;
    },
  });
}

export function mergetObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects 递归合并深度嵌套的对象
  const accumulator = Object.assign({}, obj1); // Prevent mutation of source object 防止源对象发生突变
  return Object.keys(obj2).reduce((accumulator, key) => {
    const left = obj1 ? obj1[key] : {};
    const right = obj2[key];
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      accumulator[key] = mergetObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      accumulator[key] = left.concat(right);
    } else {
      accumulator[key] = right;
    }
    return accumulator;
  }, accumulator);
}

// enum Localize {
//   "EN" = "en",
//   "DE" = "de",
//   "FI" = "fi",
//   "IT" = "it",
//   "KO" = "ko",
//   "NL" = "nl",
//   "PT-BR" = "pt-BR",
//   "RU" = "ru",
//   "TH" = "th",
//   "ZH" = "zh",
//   "ZH-TW" = "zh-TW",
// }
