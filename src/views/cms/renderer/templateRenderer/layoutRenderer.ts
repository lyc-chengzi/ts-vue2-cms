import { Vue, Component, Prop } from "vue-property-decorator";

import { PropType } from "vue";
import TemplateButtonRenderer from "./buttonRenderer.vue";
import TemplateInputRenderer from "./inputRenderer.vue";
import TemplateRateRenderer from "./rateRenderer.vue";
import { EnumComponentType } from "@/enum";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import {
    IDesignerComponent,
    registerComponentFunc,
} from "@/interface/cmsDesigner";

interface IData {
    elementType: EnumComponentType;
}

@Component<TemplateLayoutRenderer>({
    name: "layout-renderer",
    data: function (): IData {
        return {
            elementType: EnumComponentType.layout,
        };
    },
    components: {
        [EnumComponentType.layout]: TemplateLayoutRenderer,
        [EnumComponentType.button]: TemplateButtonRenderer,
        [EnumComponentType.input]: TemplateInputRenderer,
        [EnumComponentType.rate]: TemplateRateRenderer,
    },
    computed: {
        // 组合样式
        combiCss: function () {
            const defaultCss = { minHeight: "100px" };
            const css = (this.state && this.state.css) || {};
            return { ...defaultCss, ...css };
        },
    },
    mounted() {
        console.log("layout mounted, parentId:", this.parentId);
    },
})
export default class TemplateLayoutRenderer extends Vue {
    @Prop({
        type: Object as PropType<IPageModuleState>,
        required: true,
    })
    public state?: IPageModuleState;
    @Prop({
        type: String,
        required: true,
        default: () => "",
    })
    public parentId?: string;
}

export const registerComponent: registerComponentFunc = function (
    componentList
) {
    const layout: IDesignerComponent = {
        name: "layout",
        title: "容器",
        icon: "",
        group: EnumComponentGroup.layout,
        type: EnumComponentType.layout,
    };
    componentList.push(layout);
};
