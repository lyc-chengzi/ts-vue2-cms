import { registerComponent as layoutRegister } from "./layoutRenderer";
import { registerComponent as buttonRegister } from "./buttonRenderer";
import { IDesignerComponent } from "@/interface/cmsDesigner";

const registerComponent = function (): IDesignerComponent[] {
    const componentList: IDesignerComponent[] = [];
    componentList.push(layoutRegister());
    componentList.push(buttonRegister());
    return componentList;
};

export default registerComponent;
