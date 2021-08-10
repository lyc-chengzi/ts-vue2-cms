import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { VNode, PropType } from "vue";
import { IRateProps } from "@/interface/cmsComponents/rate";
import { componentRenderFunc } from "@/interface/renderer";
import { mapState } from "vuex";

@Component<RateRenderer>({
    name: "rate-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
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
export class RateRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
    onValueChange(value: number): void {
        const props = (this.element?.props || {}) as IRateProps;
        console.log("IRateProps", props);
        props.value = value;
    }
    render(): VNode | undefined {
        const props = this.element?.props as IRateProps;
        return (
            <a-rate
                defaultValue={props.defaultValue}
                onChange={this.onValueChange.bind(this)}
            ></a-rate>
        );
    }
}

const render: componentRenderFunc = function (h, element) {
    return <RateRenderer element={element}></RateRenderer>;
};

export default render;
