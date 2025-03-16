import {useJsonToUiContext} from './context';
import JsonToUiTraverse from './JsonToUiTraverse';
import {JsonSchema} from './types';

export interface JsonToUiSwitchProps {
  field: string;
  value: unknown;
  path: string;
  schema?: JsonSchema;
}

const JsonToUiSwitch = ({field, ...props}: JsonToUiSwitchProps) => {
  const {componentByTypeMapping, customComponentByTypeMapping} =
    useJsonToUiContext();

  const valueType = 'string';
  const customComponentName = props.schema?.ui?.component;
  const CustomComponent =
    customComponentName && customComponentByTypeMapping[customComponentName];

  if (CustomComponent) {
    return <CustomComponent {...props} />;
  }
  const ComponentByType = componentByTypeMapping[valueType];

  if (!ComponentByType) {
    // TODO: log error
    return null;
  }
  const isArray = valueType === 'array';
  if (valueType === 'array' || valueType === 'object') {
    return (
      // @ts-ignore the above check tells us the value is either an object or array
      <JsonToUiTraverse
        Wrapper={ComponentByType}
        isArray={isArray}
        {...props}
      />
    );
  }
  // TODO: type this better or maybe just ignore?
  return <ComponentByType {...props} />;
};

export default JsonToUiSwitch;
