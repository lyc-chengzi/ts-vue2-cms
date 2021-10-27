import { Vue, Component, Prop } from "vue-property-decorator";
import { IComponentConfig } from "@/interface/cmsComponents";
import { VNode, PropType } from "vue";
import { IRateProps } from "@/interface/cmsComponents/rate";
import { componentRenderFunc } from "@/interface/renderer";
import { mapState } from "vuex";

@Component<RateRenderer>({
    name: "rate-renderer",
    props: {
        state: {
            type: Object as PropType<IComponentConfig>,
            required: true,
        },
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
export class RateRenderer extends Vue {
    @Prop() public state?: IComponentConfig;
    onValueChange(value: number): void {
        const props = (this.state?.props || {}) as IRateProps;
        console.log("IRateProps", props);
        props.value = value;
    }
    render(): VNode | undefined {
        const props = this.state?.props as IRateProps;
        return (
            <a-rate
                defaultValue={props.defaultValue}
                onChange={this.onValueChange.bind(this)}
            ></a-rate>
        );
    }
}

const render: componentRenderFunc = function (h, state) {
    return <RateRenderer state={state}></RateRenderer>;
};

export default render;
