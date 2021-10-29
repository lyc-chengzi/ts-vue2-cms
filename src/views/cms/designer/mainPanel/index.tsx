import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import Draggable from "vuedraggable";
// import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { mapGetters } from "vuex";
import { IDesignerComponent } from "@/interface/cmsDesigner";
import LayoutDesigner from "../designerComponents/layoutDesigner.vue";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { commit_designer_dragAddComponent } from "@/store/modules/designer.module";
@Component({
    name: "designer-main-panel",
    computed: {
        ...mapGetters("designer", [
            "selectedPage",
            "selectedPageComponentList",
            "dragComponent",
        ]),
    },
})
export default class DesignerMainPanel extends Vue {
    private dragContainerClassName = "main-panel-container";
    private dragComponent: IDesignerComponent | undefined = undefined;
    mounted(): void {
        // console.log(this.$store);
    }
    public dragList: IDesignerComponent[] = [];

    dragAdd(e: any): void {
        const to: HTMLDivElement = e.to;
        const fromItem: HTMLLIElement = e.item;
        const fromGroup: EnumComponentGroup = fromItem.dataset[
            "compgroup"
        ] as EnumComponentGroup;
        const fromType = fromItem.dataset["comptype"];
        // @ts-ignore
        const selectedPage: IPageModuleState = this.selectedPage;
        // 向根添加容器组件
        if (
            to.className === this.dragContainerClassName &&
            fromGroup === EnumComponentGroup.layout
        ) {
            this.$store.commit(`designer/${commit_designer_dragAddComponent}`, {
                component: {
                    id: "",
                    name: "",
                    group: fromGroup,
                    type: fromType,
                } as IDesignerComponent,
                parent: selectedPage,
            });
        }
    }
    dragChange = (e: any): void => {
        console.log("design main panel dragChange ------------>", e);
        if (e && e.added) {
            this.dragComponent = e.added.element;
            console.log("this.dragComponent", this.dragComponent);
        }
    };

    render(): VNode {
        const dragOptions = {
            group: {
                name: "componentDesigner",
            },
        };
        // @ts-ignore 当前页
        const selectedPage: IPageModuleState = this.selectedPage;
        // @ts-ignore 当前页面组件列表
        const selectedPageComponentList: IDesignerComponent[] =
            this.selectedPageComponentList;
        return (
            <div class="designer-main-panel">
                <Draggable
                    options={dragOptions}
                    handle={`.group-${EnumComponentGroup.layout}`}
                    value={selectedPageComponentList}
                    class="main-panel-container"
                    onAdd={this.dragAdd}
                    onChange={this.dragChange}
                    data-designerid={selectedPage.id}
                >
                    {selectedPageComponentList.length === 0 ? (
                        <div class="main-panel-empty">
                            <h3>api设计器</h3>
                            <h5>请拖入容器组件</h5>
                        </div>
                    ) : null}
                    {(selectedPage.children || []).map((c) => {
                        if (c.group === EnumComponentGroup.layout) {
                            return (
                                <LayoutDesigner
                                    state={c}
                                    parentId={selectedPage.id}
                                ></LayoutDesigner>
                            );
                        }
                    })}
                </Draggable>
            </div>
        );
    }
}
