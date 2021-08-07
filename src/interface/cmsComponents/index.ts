import { EnumComponentType } from "@/enum";
import { IButtonProps } from "./button";
import { IInputProps } from "./input";
import { IRateProps } from "./rate";
export interface IPageJSONConfig {
    id: string;
    name: string;
    type: EnumComponentType;
    children?: IPageJSONConfig[];
    apis?: string[];
    props?: IButtonProps | IInputProps | IRateProps;
    css?: Record<string, string>;
    style?: string;
    events?: IComponentEvent;
}

export interface IComponentEvent {
    onClick?: (e: Event) => void;
    onFocus?: (e: Event) => void;
}
