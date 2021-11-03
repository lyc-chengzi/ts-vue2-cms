import { Vue, Component, Prop } from "vue-property-decorator";
import { IComponentConfig } from "@/interface/cmsComponents";
import { PropType } from "vue";
import { IButtonEvents, IButtonProps } from "@/interface/cmsComponents/button";
import {
    IDesignerComponent,
    registerComponentFunc,
} from "@/interface/cmsDesigner";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { EnumComponentType } from "@/enum";
@Component<TemplateButtonRenderer>({
    name: "template-button-renderer",
    mounted: function (): void {
        console.log("button renderer: state -> ", this.state);
    },
    computed: {
        combieProps() {
            const defaultProps = getDefaultProps();
            const props: IButtonProps = ((this.state && this.state.props) ||
                {}) as IButtonProps;
            return {
                ...defaultProps,
                ...props,
            };
        },
    },
})
export default class TemplateButtonRenderer extends Vue {
    @Prop({
        type: Object as PropType<IComponentConfig>,
        required: true,
    })
    public state?: IComponentConfig;
    @Prop({
        type: String,
        required: true,
        default: () => "",
    })
    public parentId?: string;
    clickHandler(e: Event): void {
        const events = (this.state?.events || {}) as IButtonEvents;
        console.log("button renderer click event & events", e, events);
        if (events.onClick) events.onClick(e, this);
    }
}

const getDefaultProps = () => {
    return {
        text: "按钮",
    } as IButtonProps;
};

export const registerComponent: registerComponentFunc = function () {
    const button: IDesignerComponent = {
        id: "",
        name: "button",
        title: "按钮",
        icon: "button",
        group: EnumComponentGroup.form,
        type: EnumComponentType.button,
        defaultProps: getDefaultProps(),
    };
    return button;
};
