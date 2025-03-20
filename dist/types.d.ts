import { FC, ReactNode } from 'react';
export interface BaseJsonSchemaUiField {
    component?: string;
}
export interface JsonSchema<T = {}> {
    type: string;
    items?: JsonSchema<T>;
    properties?: Record<string, JsonSchema<T>>;
    ui?: BaseJsonSchemaUiField & T;
    [key: string]: unknown;
}
export interface JsonToUiComponentProps<T> {
    fieldName: string;
    value: T;
    schema?: JsonSchema;
    path: string;
}
export interface JsonToUiWrapperComponentProps extends JsonToUiComponentProps<unknown> {
    children: ReactNode;
}
export type JsonToUiComponent<T = unknown> = FC<JsonToUiComponentProps<T>>;
export interface ComponentByTypeMapping {
    string: JsonToUiComponent<string>;
    boolean: JsonToUiComponent<boolean>;
    number: JsonToUiComponent<number>;
    object: JsonToUiComponent<Record<string, unknown>>;
    array: JsonToUiComponent<Array<unknown>>;
    null: JsonToUiComponent<null>;
    arrayItem: JsonToUiComponent<unknown>;
}
