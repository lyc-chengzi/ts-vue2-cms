import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";

export interface IDesignerComponent {
    name: string;
    title: string;
    icon: string;
    group: EnumComponentGroup;
    type: EnumComponentType;
}

export type registerComponentFunc = (
    componentList: IDesignerComponent[]
) => void;
