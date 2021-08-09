import { componentRenderFunc } from "@/interface/renderer";

const render: componentRenderFunc = (h, element, factory) => {
    return h(
        "div",
        {
            attrs: {
                id: element.id,
            },
            class: {
                "tdp-cms-root": true,
            },
        },
        element.children
            ? element.children.map((c) => factory(h, c))
            : undefined
    );
};

export default render;
