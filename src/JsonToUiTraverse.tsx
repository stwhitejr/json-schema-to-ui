import {FC} from 'react';
import {JsonSchema, JsonToUiWrapperComponentProps} from './types';
import JsonToUiSwitch from './JsonToUiSwitch';
import {createPath} from './util';

interface JsonToUiTraverseProps {
  value: Record<string, unknown> | Array<unknown>;
  path: string;
  schema?: JsonSchema;
  Wrapper?: FC<JsonToUiWrapperComponentProps>;
  isArray?: boolean;
}
const JsonToUiTraverse = ({
  Wrapper,
  isArray,
  ...props
}: JsonToUiTraverseProps) => {
  const children = Object.entries(props.value);
  return (
    <>
      {children.map(([key, value]) => {
        const path = createPath([props.path, key]);
        const schema = isArray
          ? props.schema?.items
          : props.schema?.properties?.[key];
        const contentProps = {
          fieldName: key,
          value,
          schema,
          path,
        };
        const content = <JsonToUiSwitch key={path} {...contentProps} />;
        if (Wrapper) {
          return (
            <Wrapper key={path} {...contentProps}>
              {content}
            </Wrapper>
          );
        }
        return content;
      })}
    </>
  );
};

export default JsonToUiTraverse;
