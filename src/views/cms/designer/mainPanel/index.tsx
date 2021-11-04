import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import Draggable from "vuedraggable";
// import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";
import { EnumAppMode, EnumComponentGroup } from "@/enum/cmsDesigner";
import { mapGetters } from "vuex";
import { IDesignerComponent } from "@/interface/cmsDesigner";

import layoutRenderer from "@/views/cms/renderer/templateRenderer/layoutRenderer.vue";
import DesignerBox from "../designerComponents/designerBox.vue";

import { IPageModuleState } from "@/interface/cmsComponents/page";
import {
    commit_designer_dragAddComponent,
    commit_designer_selectedComponent,
} from "@/store/modules/designer.module";
import { EnumComponentType } from "@/enum";
@Component({
    name: "designer-main-panel",
    computed: {
        ...mapGetters("designer", [
            "selectedPage",
            "selectedPageComponentList",
            "selectedComponent",
        ]),
    },
    components: {
        [EnumComponentType.layout]: layoutRenderer,
        DesignerBox,
    },
})
export default class DesignerMainPanel extends Vue {
    private dragContainerClassName = "main-panel-container";
    private dragComponent: IDesignerComponent | undefined = undefined;
    mounted(): void {
        // console.log(this.$store);
    }
    public dragList: IDesignerComponent[] = [];

    dragChange(e: any): void {
        // console.log("design main panel dragChange ------------>", e);
        if (e && e.added) {
            const element = e.added.element;
            this.dragComponent = element;
            // console.log(this.dragComponent);
        }
    }
    dragAdd(e: any): void {
        // console.log("design main panel dragAdd ------------>", e, this.dragComponent);
        const to: HTMLDivElement = e.to;
        const fromItem: HTMLLIElement = e.item;
        const fromGroup: EnumComponentGroup = fromItem.dataset[
            "compgroup"
        ] as EnumComponentGroup;
        // const fromType = fromItem.dataset["comptype"];
        // @ts-ignore
        const selectedPage: IPageModuleState = this.selectedPage;
        // 向根添加容器组件
        if (
            to.className.includes(this.dragContainerClassName) &&
            fromGroup === EnumComponentGroup.layout
        ) {
            this.$store.commit(`designer/${commit_designer_dragAddComponent}`, {
                component: this.dragComponent,
                parent: selectedPage,
            });
        }
    }
    // 组件选中代理事件
    handleClick(e: any): void {
        const target = e.target;
        if (target) {
            const dataset = target.dataset || {};
            if (dataset.id) {
                // @ts-ignore 设置当前选中的组件
                const currentComponent = this.selectedPageComponentList.find(
                    (comp: any) => comp.id === dataset.id
                );
                if (currentComponent) {
                    // 如果选中了组件，设置vuex的选中组件，并添加样式
                    this.$store.commit(
                        `designer/${commit_designer_selectedComponent}`,
                        { component: currentComponent }
                    );
                }
            }
        }
    }

    render(): VNode {
        const dragOptions = {
            group: {
                name: "componentDesigner",
            },
        };
        // @ts-ignore 当前页
        const selectedPage: IPageModuleState = this.selectedPage;
        // @ts-ignore
        const selectedComponent = (this.selectedComponent || {}) as any;
        return (
            <div
                class="designer-main-panel"
                // onClick={this.handleClick}
            >
                <h3>选中的组件id：{selectedComponent.id}</h3>
                <Draggable
                    options={dragOptions}
                    handle={`.group-${EnumComponentGroup.layout}`}
                    v-model={selectedPage.children}
                    class="main-panel-container"
                    onAdd={this.dragAdd}
                    onChange={this.dragChange}
                    data-designerid={selectedPage.id}
                >
                    {(selectedPage.children || []).length === 0 ? (
                        <div class="main-panel-empty">
                            <h3>api设计器</h3>
                            <h5>请拖入容器组件</h5>
                        </div>
                    ) : null}
                    {(selectedPage.children || []).map((c) => {
                        if (c.group === EnumComponentGroup.layout) {
                            const layoutComponentName = c.type;
                            return (
                                <DesignerBox
                                    data-id={c.id}
                                    state={c}
                                    parentId={selectedPage.id}
                                >
                                    <layoutComponentName
                                        data-id={c.id}
                                        state={c}
                                        key={c.id}
                                        parentId={selectedPage.id}
                                        mode={EnumAppMode.design}
                                    ></layoutComponentName>
                                </DesignerBox>
                                // <layoutComponentName
                                //     state={c}
                                //     key={c.id}
                                //     parentId={selectedPage.id}
                                //     mode={EnumAppMode.design}
                                // ></layoutComponentName>
                            );
                        }
                    })}
                </Draggable>
            </div>
        );
    }
}
