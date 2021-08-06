import { EnumComponentType } from "@/enum";
import { IButtonProps } from "./button";
import { IInputProps } from "./input";
export interface IPageJSONConfig {
  id: string;
  name: string;
  type: EnumComponentType;
  children?: IPageJSONConfig[];
  apis?: string[];
  props?: IButtonProps | IInputProps;
  css?: Record<string, string>;
  style?: string;
  events?: IComponentEvent;
}

export interface IComponentEvent {
  onClick?: (e: Event) => void;
  onFocus?: (e: Event) => void;
}
