import { EnumComponentType } from "@/enum";
import { IPageJSONConfig } from "@/interface";

const pageJSONConfig: IPageJSONConfig = {
  id: "root_97678944",
  name: "页面1",
  type: EnumComponentType.root,
  css: {
    position: "relative",
    padding: "10px",
  },
  children: [
    {
      id: "layout_344r4",
      name: "横向布局",
      type: EnumComponentType.layout,
      css: {
        position: "relative",
        display: "flex",
        "flex-flow": "row nowrap",
        "padding-top": "20px",
        "justify-content": "center",
        "align-items": "center",
      },
      children: [
        {
          id: "button_2refrf",
          name: "按钮1",
          type: EnumComponentType.button,
          css: {
            flex: "1",
            margin: "20px",
          },
          props: {
            text: "提交1",
            type: "primary",
          },
        },
        {
          id: "button_2refrf",
          name: "按钮2",
          type: EnumComponentType.button,
          css: {
            flex: "1",
            margin: "20px",
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
  ],
};
export default pageJSONConfig;
