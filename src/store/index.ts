import { EnumComponentType } from "@/enum";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 生成一个默认的json配置文件
const getDefaultJSONConfig = (): IPageJSONConfig =>
  ({
    id: `root_${new Date().valueOf}`,
    name: "根节点",
    type: EnumComponentType.root,
    children: [],
    apis: [],
    css: {},
  } as IPageJSONConfig);

export default new Vuex.Store({
  state: {
    uiDesigner: {
      json: getDefaultJSONConfig(),
      element: undefined,
    },
    root_97678944: {
      goodsList: [],
      button_2refrf: {
        users: {},
      },
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
