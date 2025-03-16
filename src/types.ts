import {FC, ReactNode} from 'react';

export interface JsonSchema {}

export interface JsonToUiComponentProps<T> {
  value: T;
  schema?: JsonSchema;
  path: string;
}

export interface JsonToUiWrapperComponentProps
  extends JsonToUiComponentProps<unknown> {
  children: ReactNode;
}

export type JsonToUiComponent<T = unknown> = FC<JsonToUiComponentProps<T>>;

export interface ComponentByTypeMapping {
  string: JsonToUiComponent<string>;
  boolean: JsonToUiComponent<boolean>;
  number: JsonToUiComponent<number>;
  integer: JsonToUiComponent<number>;
  object: JsonToUiComponent<Record<string, unknown>>;
  array: JsonToUiComponent<Array<unknown>>;
  null: JsonToUiComponent<null>;
}
