import { componentRenderFunc } from "@/interface/renderer";
import { Layout } from "ant-design-vue";

const render: componentRenderFunc = function (h, element, baseRender) {
  console.log(element);
  return h(
    Layout,
    {
      attrs: {
        id: element.id,
      },
      class: {
        "tdp-cms-layout": true,
      },
      style: element.css,
      nativeOn: {
        click: element.events?.onClick
          ? element.events.onClick
          : () => {
              console.log("layout click");
            },
      },
    },
    element.children ? element.children.map((c) => baseRender(h, c)) : undefined
  );
};

export default render;
