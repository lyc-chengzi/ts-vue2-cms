import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";

@Component({
    name: "designer-props-panel",
})
export default class DesignerPropsPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    mounted(): void {
        // console.log(this.$store);
    }
    render(): VNode {
        return (
            <div className="designer-props-panel">
                <div class="section">
                    <h3>属性</h3>
                    <div class="item">
                        <div class="label">类型</div>
                        <div class="value">
                            <a-select default-value="" style="width: 80%;">
                                <a-select-option value="">默认</a-select-option>
                                <a-select-option value="primary">
                                    primary
                                </a-select-option>
                                <a-select-option value="dashed">
                                    dashed
                                </a-select-option>
                                <a-select-option value="danger">
                                    danger
                                </a-select-option>
                                <a-select-option value="link">
                                    link
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
