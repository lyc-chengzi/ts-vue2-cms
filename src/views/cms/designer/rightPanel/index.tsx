import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";
import DesignerApiPanel from "./apiDesigner";
import DesignerCssPanel from "./cssDesigner";
import DesignerPropsPanel from "./propsDesigner";
import DesignerDataPanel from "./dataDesigner";
import { mapGetters } from "vuex";

@Component({
    name: "designer-right-panel",
    components: {
        DesignerApiPanel,
    },
    computed: {
        ...mapGetters("designer", ["selectedComponent"]),
    },
})
export default class DesignerRightPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    mounted(): void {
        console.log(this.$store);
    }
    render(): VNode {
        return (
            <a-tabs class="designer-right-box">
                <a-tab-pane key="props" tab="属性">
                    <DesignerPropsPanel />
                </a-tab-pane>
                <a-tab-pane key="css" tab="样式">
                    <DesignerCssPanel />
                </a-tab-pane>
                <a-tab-pane key="data" tab="数据">
                    <DesignerDataPanel />
                </a-tab-pane>
                <a-tab-pane key="ux" tab="交互">
                    <DesignerApiPanel />
                </a-tab-pane>
            </a-tabs>
        );
    }
}
