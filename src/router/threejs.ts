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
        path: "/threejs/index",
        meta: {
          label: "基础几何体",
          title: "旋转的正方体",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo1.vue"
          ),
      },
      {
        name: "threejs_demo2",
        path: "/threejs/demo2",
        meta: {
          label: "GUI",
          title: "GUI辅助演示",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo2.vue"
          ),
      },
      {
        name: "threejs_demo3",
        path: "/threejs/demo3",
        meta: {
          label: "obj模型渲染",
          title: "导入外部模型",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo3.vue"
          ),
      },
      {
        name: "threejs_demo4",
        path: "/threejs/demo4",
        meta: {
          label: "gltf模型渲染",
          title: "AMG",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo4.vue"
          ),
      },
      {
        name: "threejs_demo5",
        path: "/threejs/demo5",
        meta: {
          label: "动态添加物体",
          title: "动态添加",
        },
        component: () =>
          import(
            /* webpackChunkName: "threejs" */ "../views/threejsDemo/demo5.vue"
          ),
      },
    ],
  },
];
export default routes;
