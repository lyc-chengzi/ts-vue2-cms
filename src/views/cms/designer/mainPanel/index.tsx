import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import Draggable from "vuedraggable";
// import { IComponentConfig } from "@/interface/cmsComponents";
import "./index.less";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { mapGetters } from "vuex";
import { IDesignerComponent } from "@/interface/cmsDesigner";
import Layout from "../../renderer/templateRenderer/layoutRenderer.vue";

@Component({
    name: "designer-main-panel",
    computed: {
        ...mapGetters(["currentPage"]),
    },
})
export default class DesignerMainPanel extends Vue {
    mounted(): void {
        // console.log(this.$store);
    }
    public dragList: IDesignerComponent[] = [];
    dragStart = (): void => {
        console.log("designer-main-panel---> dragStart");
    };
    dragAdd = (): void => {
        console.log("designer-main-panel---> dragAdd");
        // const target = e.target;
        // const srcElement = e.srcElement;
    };
    dragUpdate = (): void => {
        console.log("designer-main-panel---> dragUpdate");
    };
    dragEnd = (): void => {
        console.log("designer-main-panel---> dragEnd");
    };

    render(): VNode {
        const dragOptions = {
            group: {
                name: "componentDesigner",
            },
        };
        // @ts-ignore
        // const currentPage: IComponentConfig = this.currentPage;
        return (
            <div class="designer-main-panel">
                <Draggable
                    options={dragOptions}
                    handle={`.group-${EnumComponentGroup.layout}`}
                    v-model={this.dragList}
                    class="main-panel-container"
                    onStart={this.dragStart}
                    onAdd={this.dragAdd}
                    onUpdate={this.dragUpdate}
                    onEnd={this.dragEnd}
                >
                    {this.dragList.length === 0 ? (
                        <div>
                            <h3>api设计器</h3>
                            <h5>请拖入容器组件</h5>
                        </div>
                    ) : null}
                    {this.dragList.map((c) => {
                        if (c.group === EnumComponentGroup.layout) {
                            return (
                                <Layout
                                    state={{
                                        id: "sdsf",
                                        name: "sf",
                                        type: c.type,
                                    }}
                                ></Layout>
                            );
                        }
                    })}
                </Draggable>
            </div>
        );
    }
}
