import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";

@Component({
    name: "designer-css-panel",
})
export default class DesignerCssPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    mounted(): void {
        // console.log(this.$store);
    }
    render(): VNode {
        return (
            <div className="designer-css-panel">
                <div class="section">
                    <h3>布局</h3>
                    <div class="item">
                        <div class="label">定位</div>
                        <div class="value">
                            <a-select
                                default-value="relative"
                                style="width: 80%;"
                            >
                                <a-select-option value="relative">
                                    相对定位
                                </a-select-option>
                                <a-select-option value="absolute">
                                    绝对定位
                                </a-select-option>
                                <a-select-option value="fixed">
                                    fixed
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">外边距</div>
                        <div class="value"></div>
                    </div>
                </div>
            </div>
        );
    }
}
