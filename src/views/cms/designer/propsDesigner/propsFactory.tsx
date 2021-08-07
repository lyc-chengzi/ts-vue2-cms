import { componentRenderFunc } from "@/interface/renderer";

const propsFactory: componentRenderFunc = (h, element, factory) => {
    console.log(h, element, factory);
    return <div>asdfasdf</div>;
};

export default propsFactory;
