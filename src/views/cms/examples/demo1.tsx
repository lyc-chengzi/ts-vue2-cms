import { Vue, Component } from "vue-property-decorator";
import "./demo1.less";
import { VNode } from "vue";
import DynamicRenderer from "../renderer/dynamicRenderer";
import data from "./demo1.data";

@Component({
  components: {
    "dynamic-renderer": DynamicRenderer,
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
        <dynamic-renderer json={data}></dynamic-renderer>
      </div>
    );
  }
}
