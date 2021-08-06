import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    name: "cms_demo1",
    path: "/cms/demo1",
    meta: {
      label: "动态渲染器",
      title: "通过json文件动态渲染出vue组件",
    },
    component: () =>
      import(/* webpackChunkName: "cms_demo1" */ "../views/cms/examples/demo1"),
  },
  {
    name: "cms_demo2",
    path: "/cms/demo2",
    meta: {
      label: "模板渲染器",
      title: "通过json文件，生成对应的模板文件",
    },
    component: () =>
      import(
        /* webpackChunkName: "cms_demo2" */ "../views/cms/examples/demo2.vue"
      ),
  },
];
export default routes;
