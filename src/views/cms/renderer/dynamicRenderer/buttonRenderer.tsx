import { Vue, Component, Prop } from "vue-property-decorator";
import { IComponentConfig } from "@/interface/cmsComponents";
import { VNode, PropType } from "vue";
import { IButtonEvents, IButtonProps } from "@/interface/cmsComponents/button";
import { componentRenderFunc } from "@/interface/renderer";
import { mapState } from "vuex";

@Component<ButtonRenderer>({
    name: "rate-renderer",
    props: {
        element: {
            type: Object as PropType<IComponentConfig>,
            required: true,
        },
    },
    render(): VNode {
        const props = (this.state?.props || {}) as IButtonProps;
        const buttonDefaultProps: IButtonProps = {
            type: props.type,
        };
        const text = props?.text || "";
        return (
            <a-button
                style={this.state?.css}
                type={buttonDefaultProps.type}
                onClick={this.clickHandler.bind(this)}
            >
                {text}
            </a-button>
        );
    },
    renderError: (h, err) => {
        console.log("error", err);
        return h("div", "rate-renderer渲染时报错");
    },
    mounted(): void {
        console.log("-----------", this.state, this.$store);
    },
    computed: mapState({
        root_97678944: (state: any) => state.root_97678944,
    }),
})
export class ButtonRenderer extends Vue {
    @Prop() public state?: IComponentConfig;
    clickHandler(e: Event): void {
        e.stopPropagation();
        const events = (this.state?.events || {}) as IButtonEvents;
        console.log("button renderer click event & events", e, events);
        if (events.onClick) events.onClick(e, this);
    }
}

const render: componentRenderFunc = function (h, state) {
    return <ButtonRenderer state={state}></ButtonRenderer>;
};

export default render;
