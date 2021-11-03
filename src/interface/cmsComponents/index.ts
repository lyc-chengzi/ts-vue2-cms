import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { IButtonProps } from "./button";
import { IInputProps } from "./input";
import { IRateProps } from "./rate";

export interface IComponentConfig {
    id: string;
    name: string;
    type: EnumComponentType;
    group: EnumComponentGroup;
    children?: IComponentConfig[];
    apis?: string[];
    props?: IButtonProps | IInputProps | IRateProps;
    defaultProps?: IButtonProps | IInputProps | IRateProps;
    css?: Record<string, string>;
    style?: string;
    events?: IComponentEvent;
}

export interface IComponentEvent {
    onClick?: (e: Event, component: Vue) => void;
    onFocus?: (e: Event, component: Vue) => void;
}
