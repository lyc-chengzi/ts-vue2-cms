import { componentRenderFunc } from "@/interface/renderer";
import { IInputProps } from "@/interface/cmsComponents/input";

const render: componentRenderFunc = function (h, element) {
    const props = (element.props || {}) as IInputProps;
    const defaultProps: IInputProps = {
        placeholder: props.placeholder || "",
        defaultValue: props.defaultValue || "",
    };
    return (
        <a-input
            placeholder={defaultProps.placeholder}
            defaultValue={defaultProps.defaultValue}
            style={element.css}
        ></a-input>
    );
};

export default render;
