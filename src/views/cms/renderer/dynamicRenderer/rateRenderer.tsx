import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { VNode } from "vue";
import { IRateProps } from "@/interface/cmsComponents/rate";
import { componentRenderFunc } from "@/interface/renderer";
import { mapState } from "vuex";

@Component<RateRenderer>({
  name: "rate-renderer",
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

  render(): VNode | undefined {
    const props = this.element?.props as IRateProps;
    return (
      <a-rate value={props.value} defaultValue={props.defaultValue}></a-rate>
    );
  }
}

const render: componentRenderFunc = function (h, element) {
  return <RateRenderer element={element}></RateRenderer>;
};

export default render;
