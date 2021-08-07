import { componentRenderFunc } from "@/interface/renderer";
import { Layout } from "ant-design-vue";

const render: componentRenderFunc = function (h, element, factory) {
    console.log(element);
    const onClick = element.events?.onClick
        ? element.events?.onClick
        : () => console.log("layout click");
    const nativeOn = { click: onClick };
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
            nativeOn: nativeOn,
        },
        element.children
            ? element.children.map((c) => factory(h, c))
            : undefined
    );
};

export default render;
