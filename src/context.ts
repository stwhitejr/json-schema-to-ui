import {createContext, useContext} from 'react';
import {JsonToUiProps} from '.';

type JsonToUiContextValue = JsonToUiProps<{}>;

// @ts-ignore
export const JsonToUiContext = createContext<JsonToUiContextValue>({});

export const useJsonToUiContext = () =>
  useContext<JsonToUiContextValue>(JsonToUiContext);
