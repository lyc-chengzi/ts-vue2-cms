<template>
  <div id="threejs_demo3">
    <div class="title">{{ title }}</div>
    <div>加载进度 {{ progress }} %</div>
    <div id="threejs_demo3_body"></div>
  </div>
</template>

<style lang="less">
#threejs_demo3 {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
  }
  #threejs_demo3_body {
    position: relative;
    height: 500px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as three from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Camera, Group, Scene, WebGLRenderer } from "three";

@Component({
  name: "threejs-demo3",
})
export default class ThreejsDemo3 extends Vue {
  title = "";
  progress = 0;
  container: HTMLDivElement | null = null;
  camera?: Camera;
  scene?: Scene;
  renderer?: WebGLRenderer;
  mouseX = 500;
  mouseY = 200;
  containerHalfX = 0;
  containerHalfY = 0;
  object?: Group;
  mounted(): void {
    this.title =
      (this.$route && this.$route.meta && (this.$route.meta.title as string)) ||
      "";
    window.document.title = this.title;
    this.init();
    this.animate();
  }
  onProgress(xhr: ProgressEvent): void {
    if (xhr.lengthComputable) {
      // const _p = (xhr.loaded / xhr.total) * 100;
      this.progress = Math.floor((xhr.loaded / xhr.total) * 100);
    }
  }
  init = (): void => {
    this.container = document.getElementById(
      "threejs_demo3_body"
    ) as HTMLDivElement;

    this.containerHalfX = this.container.offsetWidth / 2;
    this.containerHalfY = this.container.offsetHeight / 2;
    const width = this.container?.offsetWidth || 160;
    const height = this.container?.offsetHeight || 90;
    console.log(width, height);
    this.camera = new three.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.z = 250;
    this.scene = new three.Scene();
    // 环境光
    const ambientLight = new three.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);
    // 点光源
    const pointLight = new three.PointLight(0xffffff, 0.8);
    this.scene.add(pointLight);
    this.scene.add(this.camera);

    const manager = new three.LoadingManager(() => {
      if (this.object && this.scene) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.object.position.y = -95;
        this.scene.add(this.object);
      }
    });
    const loader = new OBJLoader(manager);
    loader.load(
      "/threejsAssets/obj/male02.obj",
      (obj) => {
        this.object = obj;
      },
      this.onProgress.bind(this)
    );
    this.renderer = new three.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);
    this.container.addEventListener("mousemove", this.onDocumentMouseMove);
  };
  animate = (): void => {
    requestAnimationFrame(this.animate);
    this.render();
  };
  render = (): void => {
    if (this.camera && this.scene && this.renderer) {
      console.log("render...");
      this.camera.position.x +=
        (this.mouseX - this.camera?.position.x) * 0.05 * 4;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
    }
  };
  onDocumentMouseMove = (event: MouseEvent): void => {
    this.mouseX = (event.clientX - this.containerHalfX) / 2;
    this.mouseY = (event.clientY - this.containerHalfY) / 2;
  };
}
</script>
