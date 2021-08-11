import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { VNode, PropType } from "vue";
import { IButtonEvents, IButtonProps } from "@/interface/cmsComponents/button";
import { componentRenderFunc } from "@/interface/renderer";
import { mapState } from "vuex";

@Component<ButtonRenderer>({
    name: "rate-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
    render(): VNode {
        const props = (this.element?.props || {}) as IButtonProps;
        const buttonDefaultProps: IButtonProps = {
            type: props.type,
        };
        const text = props?.text || "";
        return (
            <a-button
                style={this.element?.css}
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
        console.log("-----------", this.element, this.$store);
    },
    computed: mapState({
        root_97678944: (state: any) => state.root_97678944,
    }),
})
export class ButtonRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
    clickHandler(e: Event): void {
        e.stopPropagation();
        const events = (this.element?.events || {}) as IButtonEvents;
        console.log("button renderer click event & events", e, events);
        if (events.onClick) events.onClick(e, this);
    }
}

const render: componentRenderFunc = function (h, element) {
    return <ButtonRenderer element={element}></ButtonRenderer>;
};

export default render;
