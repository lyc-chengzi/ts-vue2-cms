import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";
import { mapGetters } from "vuex";
import { IDesignerComponent } from "@/interface/cmsDesigner";

@Component<DesignerCssPanel>({
    name: "designer-css-panel",
    computed: {
        ...mapGetters("designer", ["selectedComponent"]),
    },
})
export default class DesignerCssPanel extends Vue {
    @Prop() public element?: IComponentConfig;
    valueChange(proertyName: string, value: string): void {
        if (value) {
            // @ts-ignore
            const component: IDesignerComponent = this.selectedComponent;
            if (component) {
                if (component.css) {
                    Vue.set(component.css, proertyName, value);
                } else {
                    Vue.set(component, "css", { [proertyName]: value });
                }
            }
        }
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
                                onChange={(value: string) =>
                                    this.valueChange("position", value)
                                }
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
                        <div class="label">显示类型</div>
                        <div class="value">
                            <a-select
                                default-value="block"
                                style="width: 80%;"
                                onChange={(value: string) =>
                                    this.valueChange("display", value)
                                }
                            >
                                <a-select-option value="flex">
                                    flex
                                </a-select-option>
                                <a-select-option value="block">
                                    块元素
                                </a-select-option>
                                <a-select-option value="inline-block">
                                    行内块元素
                                </a-select-option>
                                <a-select-option value="inline">
                                    行内元素
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">背景色</div>
                        <div class="value">
                            <a-input
                                style="width: 80%;"
                                onChange={(e: any) =>
                                    this.valueChange(
                                        "backgroundColor",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
