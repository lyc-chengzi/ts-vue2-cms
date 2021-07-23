import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    name: "threejs",
    path: "/threejs",
    component: () =>
      import(
        /* webpackChunkName: "threejs" */ "../views/threejsDemo/index.vue"
      ),
    children: [
      {
        name: "threejs_demo1",
        path: "demo1",
        meta: {
          title: "旋转的正方体",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo1.vue"
          ),
      },
      {
        name: "threejs_demo2",
        path: "demo2",
        meta: {
          title: "画线",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo2.vue"
          ),
      },
      {
        name: "threejs_demo3",
        path: "demo3",
        meta: {
          title: "导入外部模型",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo3.vue"
          ),
      },
      {
        name: "threejs_demo4",
        path: "demo4",
        meta: {
          title: "AMG",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo4.vue"
          ),
      },
    ],
  },
];
export default routes;
