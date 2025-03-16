import {FC} from 'react';
import {JsonSchema, JsonToUiWrapperComponentProps} from './types';
import JsonToUiSwitch from './JsonToUiSwitch';

interface JsonToUiTraverseProps {
  value: Record<string, unknown> | Array<unknown>;
  path: string;
  schema?: JsonSchema;
  Wrapper?: FC<JsonToUiWrapperComponentProps>;
  isArray?: boolean;
}
const JsonToUiTraverse = ({Wrapper, ...props}: JsonToUiTraverseProps) => {
  const children = Object.entries(props.value);

  const content = children.map(([key, value]) => {
    // TODO: look up child schema and build new path
    const path = key;
    const schema = null;
    // TODO: if props.isArray wrap in array item wrapper
    return (
      <JsonToUiSwitch field={key} value={value} schema={schema} path={path} />
    );
  });

  if (Wrapper) {
    return <Wrapper {...props}>{content}</Wrapper>;
  }
  return <>{content}</>;
};

export default JsonToUiTraverse;
