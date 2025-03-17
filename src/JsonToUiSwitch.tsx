import {useJsonToUiContext} from './context';
import JsonToUiTraverse from './JsonToUiTraverse';
import {JsonSchema} from './types';
import {deriveTypeFromValue} from './util';

export interface JsonToUiSwitchProps {
  fieldName: string;
  value: unknown;
  path: string;
  schema?: JsonSchema;
}

const JsonToUiSwitch = (props: JsonToUiSwitchProps) => {
  const {componentByTypeMapping, customComponentByTypeMapping} =
    useJsonToUiContext();

  const valueType = deriveTypeFromValue(props.value);
  const customComponentName = props.schema?.ui?.component;
  const CustomComponent =
    customComponentName && customComponentByTypeMapping[customComponentName];

  if (CustomComponent) {
    return <CustomComponent {...props} />;
  }
  const ComponentByType = componentByTypeMapping[valueType];

  if (!ComponentByType) {
    console.error(
      `Could not map this value type to a component at path: ${props.path}`
    );
    return null;
  }

  switch (valueType) {
    case 'object': {
      return (
        // @ts-ignore we know the value type
        <componentByTypeMapping.object {...props}>
          {/* @ts-ignore we know the value type */}
          <JsonToUiTraverse {...props} />
        </componentByTypeMapping.object>
      );
    }
    case 'array': {
      return (
        // @ts-ignore we know the value type
        <componentByTypeMapping.array {...props}>
          {/* @ts-ignore we know the value type */}
          <JsonToUiTraverse
            isArray
            Wrapper={componentByTypeMapping.arrayItem}
            {...props}
          />
        </componentByTypeMapping.array>
      );
    }
    default: {
      const Component = componentByTypeMapping[valueType];
      if (!Component) {
        console.error(`Could not find a component at path: ${props.path}`);
        return null;
      }
      return <Component {...props} />;
    }
  }
};

export default JsonToUiSwitch;
