import { JsonSchema } from './types';
export interface JsonToUiSwitchProps {
    fieldName: string;
    value: unknown;
    path: string;
    schema?: JsonSchema;
}
declare const JsonToUiSwitch: (props: JsonToUiSwitchProps) => import("react/jsx-runtime").JSX.Element;
export default JsonToUiSwitch;
