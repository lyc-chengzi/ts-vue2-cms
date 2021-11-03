import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import { IMenus } from "@/interface/cmsDesigner/leftPanel";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { mapGetters } from "vuex";
import Draggable from "vuedraggable";
import classnames from "classnames";

import "./index.less";
import { commit_leftMenu_selectMenu } from "@/store/modules/leftMenu.module";
import { IDesignerComponent } from "@/interface/cmsDesigner";
import {
    commit_designer_add_page,
    commit_designer_setDragComponent,
    commit_designer_setSelectPage,
} from "@/store/modules/designer.module";
import { getUUID } from "@/utils";

@Component<DesignerLeftPanel>({
    name: "designer-left-panel",
    computed: {
        ...mapGetters("designer", ["componentList", "selectedPage", "pages"]),
        ...mapGetters("leftMenu", ["menus", "selectedMenu"]),
    },
})
export default class DesignerLeftPanel extends Vue {
    renderMenus(): VNode[] {
        // @ts-ignore 左侧菜单列表
        const menus: IMenus[] = this.menus || [];
        // @ts-ignore 页面列表
        const pageList: IPageModuleState[] = this.pages;
        // @ts-ignore 组件列表
        const compList: IDesignerComponent[] = this.componentList;

        const firstMenu = (
            <div class="first-menu">
                <ul>
                    {menus.map((c: IMenus) => {
                        return (
                            <li
                                class={classnames({ selected: c.selected })}
                                key={c.key}
                                onClick={() => this.selectFirstMenu(c)}
                            >
                                {c.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
        const dragOptions = {
            group: {
                name: "componentDesigner",
                pull: "clone",
            },
            sort: false,
        };
        const secondMenu = (
            <div class="second-menu">
                <ul
                    style={{
                        display: menus[0].selected === true ? "block" : "none",
                    }}
                    class="pages"
                >
                    <h3>页面列表</h3>
                    <button onClick={this.addPage}>添加页面</button>
                    {pageList.map((c) => {
                        return (
                            <li
                                class={classnames({
                                    "li-page": true,
                                    selected: c.selected,
                                })}
                                data-compType={c.type}
                                key={c.id}
                                onClick={() => this.selectPage(c.id)}
                            >
                                {c.name}
                            </li>
                        );
                    })}
                </ul>
                <ul
                    style={{
                        display: menus[1].selected === true ? "block" : "none",
                    }}
                >
                    <h3>组件列表</h3>
                    <Draggable
                        value={compList}
                        handle=".li-component"
                        options={dragOptions}
                        move={this.dragMove}
                        class="components"
                    >
                        {compList.map((c) => {
                            return (
                                <li
                                    class="li-component"
                                    data-compType={c.type}
                                    key={c.type}
                                    data-compGroup={c.group}
                                >
                                    {c.title}
                                </li>
                            );
                        })}
                    </Draggable>
                </ul>
            </div>
        );
        return [firstMenu, secondMenu];
    }
    selectFirstMenu = (menu: IMenus): void => {
        this.$store.commit(`leftMenu/${commit_leftMenu_selectMenu}`, { menu });
    };
    selectPage = (pageId: string): void => {
        this.$store.commit(`designer/${commit_designer_setSelectPage}`, {
            pageId,
        });
    };
    addPage = (): void => {
        this.$store.commit(`designer/commit_designer_add_page`);
    };
    dragMove(e: any): void {
        const element = e.draggedContext.element;
        element.id = element.type + '_' + getUUID();
        element.name = element.type + '_' + (new Date().valueOf());
        console.log("designer-left-panel---> dragMove", element);
        this.$store.commit(`designer/${commit_designer_setDragComponent}`, {
            component: element,
        });
    }
    render(): VNode {
        return <div class="designer-left-panel">{this.renderMenus()}</div>;
    }
}
