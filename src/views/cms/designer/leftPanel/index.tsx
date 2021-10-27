import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import { IMenus } from "@/interface/cmsDesigner/leftPanel";
import { mapGetters } from "vuex";
import Draggable from "vuedraggable";
import classnames from "classnames";

import "./index.less";

@Component<DesignerLeftPanel>({
    name: "designer-left-panel",
    computed: {
        ...mapGetters(["pages", "componentList"]),
        _menus: function () {
            const menus = this.menus;
            // @ts-ignore vuex中的 页面列表
            this.menus[0].children = this.pages.map((c) => {
                this.$set(c, "title", c.name);
                return c;
            });
            // @ts-ignore vuex中的 组件列表
            this.menus[1].children = this.componentList.map((c) => {
                this.$set(c, "title", c.name);
                return c;
            });
            return menus;
        },
    },
    mounted() {
        // @ts-ignore
        console.log("______________________", this.pages);
        // @ts-ignore
        console.log("____________", this._menus);
    },
})
export default class DesignerLeftPanel extends Vue {
    public menus: IMenus[] = [
        {
            key: "pageList",
            title: "页面列表",
            icon: "desktop",
            selected: true,
            children: [],
        },
        {
            key: "componentList",
            title: "组件列表",
            icon: "appstore",
            selected: false,
            children: [],
        },
        {
            key: "pageStructure",
            title: "页面结构",
            icon: "appstore",
            selected: false,
        },
    ];
    public secondMenuList: IMenus[] = [];
    renderMenus(): VNode[] {
        // @ts-ignore
        const menus = this._menus;
        // 选中的一级菜单
        const selectFirstMenu: IMenus | undefined = menus.find(
            (c: IMenus) => c.selected === true
        );
        let secondMenus: IMenus[] = [];
        if (selectFirstMenu) {
            // 拿到二级菜单
            secondMenus = selectFirstMenu.children || [];
        }
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
        const secondCanDrag =
            selectFirstMenu && selectFirstMenu.key === this.menus[1].key;
        const dragOptions = {
            group: {
                name: "componentDesigner",
                pull: "clone",
            },
            sort: false,
        };
        // @ts-ignore
        const list = this.componentList;
        const secondMenu = (
            <div class="second-menu">
                <ul>
                    <Draggable
                        v-model={list}
                        handle=".li-component"
                        options={dragOptions}
                        onStart={this.dragStart}
                        onAdd={this.dragAdd}
                        onUpdate={this.dragUpdate}
                        onEnd={this.dragEnd}
                    >
                        {secondMenus.map((c) => {
                            return (
                                <li
                                    class={classnames({
                                        "li-component": secondCanDrag,
                                    })}
                                    key={c.key}
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
    selectFirstMenu = (menu: IMenus) => {
        this.menus.forEach((c) => {
            c.selected = false;
        });
        menu.selected = true;
    };
    dragStart = () => {
        console.log("designer-left-panel---> dragStart");
    };
    dragAdd = () => {
        console.log("designer-left-panel---> dragAdd");
    };
    dragUpdate = () => {
        console.log("designer-left-panel---> dragUpdate");
    };
    dragEnd = () => {
        console.log("designer-left-panel---> dragEnd");
    };
    render() {
        return <div class="designer-left-panel">{this.renderMenus()}</div>;
    }
}
