import JsonToUiTraverse from './JsonToUiTraverse';
import {ComponentByTypeMapping, JsonToUiComponent} from './types';
import {JsonToUiContext} from './context';

export interface JsonToUiProps {
  value: Record<string, unknown>;
  onChange?: (path: string, value: unknown) => void;
  componentByTypeMapping: ComponentByTypeMapping;
  customComponentByTypeMapping?: Record<string, JsonToUiComponent>;
}

const JsonToUi = (props: JsonToUiProps) => {
  return (
    <JsonToUiContext.Provider value={props}>
      <JsonToUiTraverse path="" value={props.value} />
    </JsonToUiContext.Provider>
  );
};

export default JsonToUi;
