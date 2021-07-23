<template>
  <div id="threejs_demo2">
    <div class="title">{{ title }}</div>
    <div id="threejs_demo2_body"></div>
  </div>
</template>

<style lang="less">
#threejs_demo2 {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
  }
  #threejs_demo2_body {
    position: relative;
    height: 500px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as three from "three";

@Component({
  name: "threejs-demo2",
})
export default class ThreejsDemo2 extends Vue {
  title = "";
  mounted(): void {
    this.title =
      (this.$route && this.$route.meta && (this.$route.meta.title as string)) ||
      "";
    window.document.title = this.title;
    this.createScene();
  }
  createScene(): void {
    const width =
      document.getElementById("threejs_demo2_body")?.clientWidth || 0;
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(45, width / 500, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const material = new three.LineBasicMaterial({ color: 0x0000ff });

    const points = [
      new three.Vector3(-10, 0, 0),
      new three.Vector3(-0, 10, 0),
      new three.Vector3(10, 0, 0),
    ];
    const geometry = new three.BufferGeometry().setFromPoints(points);
    const line = new three.Line(geometry, material);
    scene.add(line);
    const renderer = new three.WebGLRenderer();
    renderer.setSize(width, 500);
    console.log(renderer);
    const renderBody = window.document.getElementById("threejs_demo2_body");
    if (renderBody) renderBody.appendChild(renderer.domElement);

    function animate(): void {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }
}
</script>
