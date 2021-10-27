import buttonRenderer from "./buttonRenderer";
import rootRenderer from "./rootRenderer";
import inputRenderer from "./inputRenderer";
import layoutRenderer from "./layoutRenderer";
import rateRenderer from "./rateRenderer";
import { EnumComponentType } from "@/enum";
import { factoryRenderFunc, componentRenderFunc } from "@/interface/renderer";

interface IRendererFactoryType {
    type: EnumComponentType;
    componentRender: componentRenderFunc;
}

const rendererTypes: IRendererFactoryType[] = [];

const renderFactory: factoryRenderFunc = (h, state) => {
    if (!state) return undefined;

    for (let i = 0; i < rendererTypes.length; i++) {
        const renderer = rendererTypes[i];
        if (state.type === renderer.type) {
            return renderer.componentRender(h, state, renderFactory);
        }
    }
};
// 注册渲染器
const rendererRegister = (
    elementType: EnumComponentType,
    componentRender: componentRenderFunc
): void => {
    rendererTypes.push({ type: elementType, componentRender });
};

export default renderFactory;
export { rendererRegister };

rendererRegister(EnumComponentType.page, rootRenderer);
rendererRegister(EnumComponentType.layout, layoutRenderer);
rendererRegister(EnumComponentType.button, buttonRenderer);
rendererRegister(EnumComponentType.input, inputRenderer);
rendererRegister(EnumComponentType.rate, rateRenderer);
