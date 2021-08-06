import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import threejsRoutes from "../router/threejs";
import cmsRoutes from "../router/cms";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const finalRoutes = routes.concat(threejsRoutes).concat(cmsRoutes);
console.log("BASE_URL", process.env.BASE_URL);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: finalRoutes,
});

router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  const className = to.meta?.className || "";
  if (className) {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    if (html) {
      html.setAttribute("class", className);
    }
    if (body) {
      body.setAttribute("class", className);
    }
  }
  next();
});

export default router;
