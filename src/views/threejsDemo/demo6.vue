<style lang="less">
#threejs_demo6 {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
  }
  #threejs_demo6_body {
    position: relative;
    height: 500px;
  }
}
</style>

<script lang="tsx">
import * as three from "three";
import demoBase from "./demoBase";
import { VNode } from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "threejs-demo6",
})
export default class ThreejsDemo6 extends demoBase {
  containerId = "threejs_demo6_body";
  private title = "";
  private controlParams = {
    rotationSpeed: 0.02,
    numberOfObjects: this.scene.children.length,
    removeCube: () => {
      console.log("removeCube", this);
      const children = this.scene.children;
      const lastChild = children[children.length - 1];
      if (lastChild instanceof three.Mesh) {
        this.scene.remove(lastChild);
        this.controlParams.numberOfObjects = this.scene.children.length;
      }
    },
    addCube: () => {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new three.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new three.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new three.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = `cube-${this.scene.children.length}`;

      cube.position.set(
        Math.round(Math.random() * 60) - 30,
        Math.round(Math.random() * 5),
        Math.round(Math.random() * 40) - 20
      );
      this.scene.add(cube);
      this.controlParams.numberOfObjects = this.scene.children.length;
    },
    outputMesh: () => {
      console.log(this.scene.children);
    },
  };
  render(): VNode {
    return (
      <div id="threejs_demo6">
        <div class="title" title={this.title}>
          {this.title}
        </div>
        <div id={this.containerId}></div>
      </div>
    );
  }
  mounted(): void {
    super.mounted();
    this.title =
      (this.$route && this.$route.meta && (this.$route.meta.title as string)) ||
      "";
    this.init();
  }
  beforeDestroy(): void {
    this.gui.destroy();
  }
  init(): void {
    this.initHelper();
    this.createPlane();
    this.createMyGeoMetry();
    this.initCamera();
    this.initLight();
    this.initRenderer();
    this.renderer.setClearColor(0xffffff);
    console.log(this.scene);
    this.renderer.render(this.scene, this.camera);
    // this.animate();
  }
  createMyGeoMetry(): void {
    //   const vertices = new Float32Array([
    //     -1.0, -1.0,  1.0,
    //  1.0, -1.0,  1.0,
    //  1.0,  1.0,  1.0,
    //  1.0,  1.0,  1.0,
    // -1.0,  1.0,  1.0,
    // -1.0, -1.0,  1.0,
    //   ]);
    // const geometry = new three.BufferGeometry();
    // geometry.setAttribute("myGeometry", new three.BufferAttribute(vertices, 3));
    // const material = new three.MeshBasicMaterial({ color: 0xff0000 });
    // const mesh = new three.Mesh(geometry, material);
    // mesh.position.set(0, 0, 0);
    // this.scene.add(mesh);
    console.log(111);
  }
  addGUI(): void {
    // gui
    this.gui.add(this.controlParams, "rotationSpeed", 0, 0.5).name("旋转速度");
    this.gui.add(this.controlParams, "addCube").name("添加物体");
    this.gui.add(this.controlParams, "removeCube");
    this.gui.add(this.controlParams, "outputMesh");
    this.gui.add(this.controlParams, "numberOfObjects").listen();
    console.log("gui", this.gui);
  }
  animate(): void {
    const run = (): void => {
      this.stats.update();
      this.scene.traverse((child) => {
        if (child instanceof three.Mesh && child.name) {
          child.rotation.x += this.controlParams.rotationSpeed;
          child.rotation.y += this.controlParams.rotationSpeed;
          child.rotation.z += this.controlParams.rotationSpeed;
        }
      });
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(run);
    };
    run();
  }
}
</script>
