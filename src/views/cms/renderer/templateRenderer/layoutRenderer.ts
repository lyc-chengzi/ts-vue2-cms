import { Vue, Component, Prop } from "vue-property-decorator";
import { PropType } from "vue";

import Draggable from "vuedraggable";

import DesignerBox from "@/views/cms/designer/designerComponents/designerBox.vue";
import TemplateButtonRenderer from "./buttonRenderer.vue";
import TemplateInputRenderer from "./inputRenderer.vue";
import TemplateRateRenderer from "./rateRenderer.vue";
import { EnumComponentType } from "@/enum";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { EnumAppMode, EnumComponentGroup } from "@/enum/cmsDesigner";
import {
    IDesignerComponent,
    registerComponentFunc,
} from "@/interface/cmsDesigner";
import { commit_designer_dragAddComponent } from "@/store/modules/designer.module";

@Component<TemplateLayoutRenderer>({
    name: "layout-renderer",
    props: {
        mode: {
            required: false,
            type: String as PropType<EnumAppMode>,
            default: () => EnumAppMode.view,
        },
    },
    components: {
        [EnumComponentType.layout]: TemplateLayoutRenderer,
        [EnumComponentType.button]: TemplateButtonRenderer,
        [EnumComponentType.input]: TemplateInputRenderer,
        [EnumComponentType.rate]: TemplateRateRenderer,
        Draggable: Draggable,
        DesignerBox,
    },
    computed: {
        _isDesignMode() {
            return this.mode === EnumAppMode.design;
        },
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
    methods: {
        dragAddHandler() {
            const targetComponent = this.state;
            if (
                targetComponent &&
                targetComponent.group === EnumComponentGroup.layout
            ) {
                this.$store.commit(
                    `designer/${commit_designer_dragAddComponent}`,
                    {
                        component: this.dragComponent,
                        parent: targetComponent,
                    }
                );
            }
        },
        dragChangeHandler(e: any) {
            if (e && e.added) {
                this.dragComponent = e.added.element;
            }
        },
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
    @Prop({
        type: String as PropType<EnumAppMode>,
        required: true,
        default: () => EnumAppMode.view,
    })
    public mode?: EnumAppMode;
    public componentType = EnumComponentType.layout;
    public dragComponent?: IDesignerComponent;
}

export const registerComponent: registerComponentFunc = function () {
    const layout: IDesignerComponent = {
        id: "",
        name: "layout",
        title: "容器",
        icon: "",
        group: EnumComponentGroup.layout,
        type: EnumComponentType.layout,
    };
    return layout;
};
