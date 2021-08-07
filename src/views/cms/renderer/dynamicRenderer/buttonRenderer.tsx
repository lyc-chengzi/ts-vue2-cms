import { componentRenderFunc } from "@/interface/renderer";
import { Button } from "ant-design-vue";
import { IButtonProps } from "@/interface/cmsComponents/button";

const render: componentRenderFunc = function (h, element) {
    const props = (element.props || {}) as IButtonProps;
    const buttonDefaultProps: IButtonProps = {
        type: props.type,
    };
    const text = props?.text || "";
    return h(
        Button,
        {
            props: buttonDefaultProps,
            style: element.css,
        },
        text
    );
};

export default render;
