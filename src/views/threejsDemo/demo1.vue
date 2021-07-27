<style lang="less">
#threejs_demo1 {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
  }
  #threejs_demo1_body {
    position: relative;
    height: 500px;
  }
}
</style>

<script lang="tsx">
import * as three from "three";
import { VNode } from "vue";
import { Component } from "vue-property-decorator";
import demoBase from "./demoBase";

class demo1Control {
  rotationSpeed = 0.02;
  bouncingSpeed = 0.03;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const controls = new demo1Control();

@Component({
  name: "threejs-demo1",
})
export default class ThreejsDemo1 extends demoBase {
  private title = "";
  containerId = "threejs_demo1_body";
  render(): VNode {
    return (
      <div id="threejs_demo1">
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
    this.createScene();
  }
  beforeDestroy(): void {
    this.gui.destroy();
  }
  createScene(): void {
    this.initHelper();
    this.setCamera();
    this.createPlane();
    this.setLight();
    this.setRenderer();

    const boxGeometry = new three.BoxGeometry(5, 5, 5);
    const boxMaterial = new three.MeshLambertMaterial({
      color: 0x00ff00,
      // wireframe: true,
    });
    const cube = new three.Mesh(boxGeometry, boxMaterial);
    cube.position.set(-10, 10, 5);
    cube.castShadow = true;
    this.scene.add(cube);

    const sphereGeometry = new three.SphereGeometry(5, 12, 12);
    const sphereMaterial = new three.MeshPhongMaterial({
      color: 0xaabbcc,
      wireframe: true,
    });
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(10, 10, 1);
    sphere.castShadow = true;
    this.scene.add(sphere);

    this.renderer.render(this.scene, this.camera);
    let goRight = true;
    let cameraXMax = 40;
    let step = 0;
    this.gui.add(controls, "rotationSpeed", 0, 0.5);
    this.gui.add(controls, "bouncingSpeed", 0, 0.5);
    console.log("gui", this.gui);
    const animate = (): void => {
      this.stats.update();
      requestAnimationFrame(animate);
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;
      step += controls.bouncingSpeed;
      sphere.position.x = 5 + 10 * Math.cos(step);
      sphere.position.y = 5 + 10 * Math.abs(Math.sin(step));
      if (goRight) {
        this.camera.position.x += Math.cos(0.01) * 0.5;
        this.camera.rotation.y += 0.002 * Math.PI;
        this.camera.rotation.z += 0.002 * Math.PI;
        // this.camera.position.z += Math.abs(Math.sin(step));
      } else {
        this.camera.position.x -= Math.cos(0.01) * 0.5;
        this.camera.rotation.y -= 0.002 * Math.PI;
        this.camera.rotation.z -= 0.002 * Math.PI;
        // this.camera.position.z -= Math.abs(Math.sin(step))
      }
      goRight =
        Math.abs(this.camera.position.x) >= cameraXMax ? !goRight : goRight;
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
</script>
