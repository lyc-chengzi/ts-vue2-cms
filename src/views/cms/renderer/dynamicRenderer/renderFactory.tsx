import buttonRenderer from "./buttonRenderer";
import rootRenderer from "./rootRenderer";
import inputRenderer from "./inputRenderer";
import layoutRenderer from "./layoutRenderer";
import { EnumComponentType } from "@/enum";
import { baseRenderFunc } from "@/interface/renderer";

const render: baseRenderFunc = (h, element) => {
  if (!element) return undefined;
  // 渲染根节点
  if (element.type === EnumComponentType.root) {
    return rootRenderer(h, element, render);
  }
  // 渲染layout组件
  else if (element.type === EnumComponentType.layout) {
    return layoutRenderer(h, element, render);
  } else if (element.type === EnumComponentType.button) {
    return buttonRenderer(h, element, render);
  } else if (element.type === EnumComponentType.input) {
    return inputRenderer(h, element, render);
  }
};

export default render;
