import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";

@Component({
    name: "designer-api-panel",
})
export default class DesignerApiPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    mounted(): void {
        // console.log(this.$store);
    }
    render(): VNode {
        return <div className="designer-api-panel">api设计器</div>;
    }
}
