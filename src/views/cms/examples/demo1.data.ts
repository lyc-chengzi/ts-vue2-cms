import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { IComponentConfig } from "@/interface/cmsComponents";
import { IButtonEvents } from "@/interface/cmsComponents/button";

const pageJSONConfig: IComponentConfig = {
    id: "root_97678944",
    name: "页面1",
    type: EnumComponentType.page,
    group: EnumComponentGroup.page,
    css: {
        position: "relative",
        padding: "10px",
    },
    children: [
        {
            id: "layout_344r4",
            name: "横向布局",
            type: EnumComponentType.layout,
            group: EnumComponentGroup.layout,
            css: {
                position: "relative",
                display: "flex",
                "flex-flow": "row nowrap",
                padding: "20px",
                "justify-content": "center",
                "align-items": "center",
            },
            children: [
                {
                    id: "button_2refrf1",
                    name: "按钮1",
                    type: EnumComponentType.button,
                    group: EnumComponentGroup.form,
                    css: {
                        flex: "1",
                        margin: "20px 20px 20px 0",
                    },
                    props: {
                        text: "提交1",
                        type: "dashed",
                    },
                    events: {
                        onClick: function (e, component) {
                            console.log(e, component);
                        },
                    } as IButtonEvents,
                },
                {
                    id: "button_2refrf2",
                    name: "按钮2",
                    type: EnumComponentType.button,
                    group: EnumComponentGroup.form,
                    css: {
                        flex: "1",
                        margin: "20px 20px 20px 0",
                    },
                    props: {
                        text: "提交2",
                        type: "primary",
                    },
                },
                {
                    id: "input_2refrf",
                    name: "文本框1",
                    type: EnumComponentType.input,
                    group: EnumComponentGroup.form,
                    css: {
                        flex: "1",
                    },
                    props: {
                        placeholder: "请输入姓名",
                        defaultValue: "liuyc14",
                    },
                },
            ],
        },
        {
            id: "layout_344r42",
            name: "红色容器",
            type: EnumComponentType.layout,
            group: EnumComponentGroup.layout,
            css: {
                position: "relative",
                display: "block",
                "background-color": "red",
                height: "400px",
            },
            children: [
                {
                    id: "rate_344r4sc2",
                    name: "评分组件",
                    type: EnumComponentType.rate,
                    group: EnumComponentGroup.form,
                    props: {
                        defaultValue: 4,
                        value: 4,
                    },
                },
            ],
        },
        {
            id: "layout_344r43",
            name: "蓝色容器",
            type: EnumComponentType.layout,
            group: EnumComponentGroup.layout,
            css: {
                position: "relative",
                display: "flex",
                "flex-flow": "row nowrap",
                "background-color": "blue",
                height: "280px",
            },
            children: [
                {
                    id: "layout_344r4_3f",
                    name: "粉色容器1",
                    type: EnumComponentType.layout,
                    group: EnumComponentGroup.layout,
                    css: {
                        position: "relative",
                        display: "block",
                        flex: "1",
                        "background-color": "pink",
                        height: "280px",
                        "margin-right": "10px",
                    },
                },
                {
                    id: "layout_344r_s43",
                    name: "灰色容器",
                    type: EnumComponentType.layout,
                    group: EnumComponentGroup.layout,
                    css: {
                        position: "relative",
                        display: "block",
                        "background-color": "gray",
                        height: "280px",
                        flex: "1",
                    },
                },
            ],
        },
        {
            id: "layout_344r44",
            name: "屏幕固定容器",
            type: EnumComponentType.layout,
            group: EnumComponentGroup.layout,
            css: {
                position: "fixed",
                display: "block",
                "background-color": "yellow",
                height: "80px",
                width: "80px",
                top: "0",
                right: "0",
            },
            events: {
                onClick: function (e: Event): void {
                    console.log(e);
                },
            },
        },
    ],
};
export default pageJSONConfig;
