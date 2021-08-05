import { Vue, Component } from "vue-property-decorator";
import "./demo1.less";
import { VNode } from "vue";
import CMSRenderer from "./renderer/cmsRenderer";
import data from "./demo1.data";

@Component({
  components: {
    "cms-renderer": CMSRenderer,
  },
})
export default class CMSDemo1 extends Vue {
  mounted(): void {
    console.log(data);
    console.log(this.$slots);
  }
  render(): VNode {
    return (
      <div id="cms_demo1">
        <cms-renderer json={data}></cms-renderer>
      </div>
    );
  }
}
