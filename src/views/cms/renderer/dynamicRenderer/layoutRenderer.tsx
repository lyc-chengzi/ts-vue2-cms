import { componentRenderFunc } from "@/interface/renderer";
import { Layout } from "ant-design-vue";

const render: componentRenderFunc = function (h, state, factory) {
    const onClick = state.events?.onClick
        ? state.events?.onClick
        : () => console.log("layout click");
    const nativeOn = { click: onClick };
    return h(
        Layout,
        {
            attrs: {
                id: state.id,
            },
            class: {
                "tdp-cms-layout": true,
            },
            style: state.css,
            nativeOn: nativeOn,
        },
        state.children ? state.children.map((c) => factory(h, c)) : undefined
    );
};

export default render;
