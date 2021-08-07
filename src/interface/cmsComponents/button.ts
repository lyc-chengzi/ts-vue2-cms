import { EnumButtonPropsKey } from "@/enum/cmsComponents/button";
import { IComponentEvent } from "./index";

export interface IButtonProps {
    [EnumButtonPropsKey.text]?: string;
    [EnumButtonPropsKey.disabled]?: boolean;
    [EnumButtonPropsKey.ghost]?: boolean;
    [EnumButtonPropsKey.htmlType]?: string;
    [EnumButtonPropsKey.icon]?: string;
    [EnumButtonPropsKey.loading]?: boolean | { delay: number };
    [EnumButtonPropsKey.shape]?: "circle" | "round";
    [EnumButtonPropsKey.type]?: "primary" | "dashed" | "danger" | "link";
    [EnumButtonPropsKey.scheme]?: Record<string, string>;
}

export interface IButtonEvents extends IComponentEvent {
    onPress?: (e: Event) => void;
}
