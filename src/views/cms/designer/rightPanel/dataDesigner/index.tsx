import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";

@Component({
    name: "designer-data-panel",
})
export default class DesignerDataPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    mounted(): void {
        // console.log(this.$store);
    }
    render(): VNode {
        return <div className="designer-data-panel">data设计器</div>;
    }
}
