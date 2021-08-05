import { EnumComponentType } from "@/enum";
import { IButtonProps } from "./cmsComponents/button";
import { IInputProps } from "./cmsComponents/input";

export interface IPageJSONConfig {
  id: string;
  name: string;
  type: EnumComponentType;
  children?: IPageJSONConfig[];
  apis?: string[];
  props?: IButtonProps | IInputProps;
  css?: Record<string, string>;
  style?: string;
}
