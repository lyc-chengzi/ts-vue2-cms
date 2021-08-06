import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import "./right.less";

@Component({
  name: "designer-right",
})
export default class UIDesignerRight extends Vue {
  @Prop() public element?: IPageJSONConfig;
  mounted(): void {
    console.log(this.$store);
  }
  render(): VNode {
    return (
      <a-tabs class="designer-right-box">
        <a-tab-pane key="props" tab="属性">
          <div class="section">
            <h3>属性</h3>
            <div class="item">
              <div class="label">类型</div>
              <div class="value">
                <a-select default-value="" style="width: 80%;">
                  <a-select-option value="">默认</a-select-option>
                  <a-select-option value="primary">primary</a-select-option>
                  <a-select-option value="dashed">dashed</a-select-option>
                  <a-select-option value="danger">danger</a-select-option>
                  <a-select-option value="link">link</a-select-option>
                </a-select>
              </div>
            </div>
            <div class="item">
              <div class="label">外边距</div>
              <div class="value"></div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="css" tab="样式">
          <div class="section">
            <h3>布局</h3>
            <div class="item">
              <div class="label">定位</div>
              <div class="value">
                <a-select default-value="relative" style="width: 80%;">
                  <a-select-option value="relative">相对定位</a-select-option>
                  <a-select-option value="absolute">绝对定位</a-select-option>
                  <a-select-option value="fixed">fixed</a-select-option>
                </a-select>
              </div>
            </div>
            <div class="item">
              <div class="label">外边距</div>
              <div class="value"></div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="data" tab="数据">
          Content of tab 3
        </a-tab-pane>
      </a-tabs>
    );
  }
}
