import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    name: "cms_demo1",
    path: "/cms/demo1",
    meta: {
      label: "基础几何体",
      title: "旋转的正方体",
    },
    component: () =>
      import(/* webpackChunkName: "cms_demo1" */ "../views/cms/demo1"),
  },
  {
    name: "cms_demo2",
    path: "/cms/demo2",
    meta: {
      label: "GUI",
      title: "GUI辅助演示",
    },
    component: () =>
      import(/* webpackChunkName: "cms_demo2" */ "../views/cms/demo2.vue"),
  },
];
export default routes;
