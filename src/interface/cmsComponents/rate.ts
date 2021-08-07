import { EnumRatePropsKey } from "@/enum/cmsComponents/rate";
import { IComponentEvent } from "./index";

export interface IRateProps {
    [EnumRatePropsKey.value]?: number;
    [EnumRatePropsKey.defaultValue]?: number;
}

export interface IRateEvents extends IComponentEvent {
    onPress?: (e: Event) => void;
}
