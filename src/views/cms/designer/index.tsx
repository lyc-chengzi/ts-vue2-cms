import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import "./index.less";
import DesignerRight from "./right";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { EnumComponentType } from "@/enum";

@Component({
  name: "designer",
  components: {
    "designer-right": DesignerRight,
  },
})
export default class Designer extends Vue {
  private json: IPageJSONConfig = {
    id: `root_${new Date().valueOf}`,
    name: "根节点",
    type: EnumComponentType.root,
    children: [],
    apis: [],
    css: {},
  };
  private currentNode = this.json;
  mounted(): void {
    console.log(this.$route.meta);
  }
  render(): VNode {
    return (
      <div class={this.$route.meta?.className}>
        <div class="left"></div>
        <div class="body">UI设计</div>
        <designer-right
          class="right"
          element={this.currentNode}
        ></designer-right>
      </div>
    );
  }
}
