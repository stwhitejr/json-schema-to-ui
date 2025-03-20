import { FC } from 'react';
import { JsonSchema, JsonToUiWrapperComponentProps } from './types';
interface JsonToUiTraverseProps {
    value: Record<string, unknown> | Array<unknown>;
    path: string;
    schema?: JsonSchema;
    Wrapper?: FC<JsonToUiWrapperComponentProps>;
    isArray?: boolean;
}
declare const JsonToUiTraverse: ({ Wrapper, isArray, ...props }: JsonToUiTraverseProps) => import("react/jsx-runtime").JSX.Element;
export default JsonToUiTraverse;
