import JsonToUiTraverse from './JsonToUiTraverse';
import {ComponentByTypeMapping, JsonSchema, JsonToUiComponent} from './types';
import {JsonToUiContext} from './context';

export interface JsonToUiProps<T> {
  value: Record<string, unknown>;
  onChange: (path: string, value: unknown) => void;
  onDelete: (path: string) => void;
  componentByTypeMapping: ComponentByTypeMapping;
  customComponentByTypeMapping?: Record<string, JsonToUiComponent>;
  schema?: JsonSchema<T>;
}

const JsonToUi = <T extends {}>(props: JsonToUiProps<T>) => {
  return (
    <JsonToUiContext.Provider value={props}>
      <JsonToUiTraverse path="" schema={props.schema} value={props.value} />
    </JsonToUiContext.Provider>
  );
};

export default JsonToUi;
