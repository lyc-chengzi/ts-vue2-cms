<template>
  <div id="threejs">
    <div class="nav">
      <router-link to="/threejs/demo1" class="menu-item">demo1</router-link>
      <router-link to="/threejs/demo2" class="menu-item">demo2</router-link>
      <router-link to="/threejs/demo3" class="menu-item">人</router-link>
      <router-link to="/threejs/demo4" class="menu-item">AMG</router-link>
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

@Component({
  name: "threejs-index",
})
export default class ThreejsIndex extends Vue {
  @Prop() private msg!: string;
}
</script>
