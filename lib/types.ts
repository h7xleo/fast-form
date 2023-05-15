import { PropType, DefineComponent } from "vue";
import { ErrorSchema } from "./validator";
import {
  FormatDefinition,
  AnySchemaObject,
  KeywordErrorDefinition,
  SchemaCxt,
} from "ajv";
import { AnyValidateFunction, AnySchema } from "ajv/dist/core";

export enum SchemaType {
  "NUMBER" = "number",
  "STRING" = "string",
  "INTEGER" = "integer",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

type SchemaRef = { $ref: string };

export interface JsonSchema {
  type?: SchemaType | string;
  properties?: {
    [key: string]: JsonSchema;
  };
  items?: JsonSchema | JsonSchema[] | SchemaRef;
  uniqueItems?: any;
  required?: string[];
  default?: any;
  format?: string;
  const?: any;
  dependencies?: {
    [key: string]: JsonSchema | string[] | SchemaRef;
  };
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  //   vjsf?:VueJsonSchemaConfig
  enum?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: JsonSchema;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  multipleof?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  title?: string;
}

export const ComponentPropsDefault = {
  schema: {
    type: Object as PropType<JsonSchema>,
    require: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    require: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<JsonSchema>,
    require: true,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
} as const;

export type ComponentDefine = DefineComponent<typeof ComponentPropsDefault>;

export const CommonWidgetPropsDefine = {
  schema: {
    type: Object as PropType<JsonSchema>,
    required: true,
  },
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  options: {
    type: Object as PropType<{ [key: string]: any }>,
  },
} as const;

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true,
  },
} as const;

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine
>;
export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine
>;

export enum SelectionWidgetNames {
  SelectionWidget = "SelectionWidget",
}
export enum CommonWigetNames {
  TextWidget = "TextWidget",
  NumberWidget = "NumberWidget",
  BooleanWidget = "BooleanWidget",
  IntegerWidget = "IntegerWidget",
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetDefine;
    [CommonWigetNames.TextWidget]: CommonWidgetDefine;
    [CommonWigetNames.NumberWidget]: CommonWidgetDefine;
    [CommonWigetNames.BooleanWidget]: CommonWidgetDefine;
    [CommonWigetNames.IntegerWidget]: CommonWidgetDefine;
  };
}

export type UISchema = {
  widget?: string | CommonWidgetDefine;
  properties?: {
    [key: string]: UISchema;
  };
  items?: UISchema | UISchema[];
} & {
  [key: string]: any;
};

export interface CustomFormat {
  name: string;
  definition: FormatDefinition<string | number>;
  component: CommonWidgetDefine | any;
}

export interface CustomKeyword {
  name: string;
  definition: KWDefinition;
  transformSchema: (originSchema: JsonSchema) => JsonSchema;
}

declare const __KWJSONType: readonly [
  "string",
  "number",
  "integer",
  "boolean",
  "null",
  "object",
  "array",
];
type KWJSONType = typeof __KWJSONType;
interface KWDefinition {
  keyword: string | string[];
  type?: KWJSONType | KWJSONType[];
  schemaType?: KWJSONType | KWJSONType[];
  allowUndefined?: boolean;
  $data?: boolean;
  implements?: string[];
  before?: string;
  post?: boolean;
  metaSchema?: AnySchemaObject;
  validateSchema?: AnyValidateFunction;
  dependencies?: string[];
  error?: KeywordErrorDefinition;
  $dataError?: KeywordErrorDefinition;
  marco: (
    schema: any,
    parentSchema: AnySchemaObject,
    it: SchemaCxt,
  ) => AnySchema;
}
