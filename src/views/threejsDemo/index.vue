<template>
  <div id="threejs">
    <div class="nav">
      <router-link
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
        class="menu-item"
        >{{ route.meta.label }}</router-link
      >
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>
<style lang="less">
@import url("../../styles/var/index.less");
#threejs {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  .nav {
    width: 200px;
    padding: 30px;
    flex: 0 0 auto;
    background-color: @primary-color;
    a {
      font-weight: bold;
      color: #fff;
    }
    a.router-link-exact-active {
      color: #42b983;
    }
    a.menu-item {
      display: block;
      padding: 10px 0;
    }
  }
  .body {
    flex: 1;
    overflow: hidden;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import threejsRoutes from "../../router/threejs";

@Component({
  name: "threejs-index",
})
export default class ThreejsIndex extends Vue {
  @Prop() private msg!: string;
  private routes: RouteConfig[] = [];
  mounted(): void {
    threejsRoutes[0].children?.map((route) => {
      this.routes.push(route);
    });
    console.log(this.routes);
  }
}
</script>
