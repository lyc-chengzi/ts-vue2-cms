import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface";
import renderFactory from "./renderFactory";
import { VNode } from "vue";
@Component({
  name: "cms-renderer",
  renderError: (h, err) => {
    console.log("error", err);
    return h("div", "渲染时报错");
  },
})
export default class CMSRenderer extends Vue {
  @Prop() public json?: IPageJSONConfig;
  mounted(): void {
    console.log("-----------", this.json);
  }
  render(): VNode | undefined {
    if (this.json) {
      return renderFactory(this.$createElement, this.json);
    } else {
      return <div class="tdp-cms-renderer"></div>;
    }
  }
}
