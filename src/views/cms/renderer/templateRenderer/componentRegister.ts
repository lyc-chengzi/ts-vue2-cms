import { registerComponent as layoutRegister } from "./layoutRenderer";
import { registerComponent as buttonRegister } from "./buttonRenderer";
import { IDesignerComponent } from "@/interface/cmsDesigner";

const registerComponent = function (componentList: IDesignerComponent[]): void {
    layoutRegister(componentList);
    buttonRegister(componentList);
};

export default registerComponent;
