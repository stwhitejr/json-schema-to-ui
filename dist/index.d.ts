import { ComponentByTypeMapping, JsonSchema, JsonToUiComponent } from './types';
export interface JsonToUiProps<T> {
    value: Record<string, unknown>;
    onChange: (path: string, value: unknown) => void;
    onDelete: (path: string) => void;
    componentByTypeMapping: ComponentByTypeMapping;
    customComponentByTypeMapping?: Record<string, JsonToUiComponent>;
    schema?: JsonSchema<T>;
}
declare const JsonToUi: <T extends {}>(props: JsonToUiProps<T>) => import("react/jsx-runtime").JSX.Element;
export default JsonToUi;
