import { componentRenderFunc } from "@/interface/renderer";

const render: componentRenderFunc = (h, state, factory) => {
    return h(
        "div",
        {
            attrs: {
                id: state.id,
            },
            class: {
                "tdp-cms-root": true,
            },
            style: state.css,
        },
        state.children ? state.children.map((c) => factory(h, c)) : undefined
    );
};

export default render;
