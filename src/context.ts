import {createContext, useContext} from 'react';
import {JsonToUiProps} from './JsonToUi';

type JsonToUiContextValue = JsonToUiProps<{}>;

// @ts-ignore
export const JsonToUiContext = createContext<JsonToUiContextValue>({});

export const useJsonToUiContext = () =>
  useContext<JsonToUiContextValue>(JsonToUiContext);
