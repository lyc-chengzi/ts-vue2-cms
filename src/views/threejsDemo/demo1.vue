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
import { Component, Vue } from "vue-property-decorator";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

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
export default class ThreejsDemo1 extends Vue {
  private title = "";
  private gui = new GUI();
  render(): VNode {
    return (
      <div id="threejs_demo1">
        <div class="title" title={this.title}>
          {this.title}
        </div>
        <div id="threejs_demo1_body"></div>
      </div>
    );
  }
  mounted(): void {
    this.title =
      (this.$route && this.$route.meta && (this.$route.meta.title as string)) ||
      "";
    window.document.title = this.title;
    this.createScene();
  }
  beforeDestroy(): void {
    this.gui.destroy();
  }
  createScene(): void {
    const width =
      document.getElementById("threejs_demo1_body")?.clientWidth || 0;
    const height =
      document.getElementById("threejs_demo1_body")?.clientHeight || 500;
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(-100, 80, 100);

    const axes = new three.AxesHelper(30);
    scene.add(axes);

    const planeGeometry = new three.PlaneGeometry(200, 60);
    const planeMaterial = new three.MeshBasicMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
    });
    const plane = new three.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    // plane.rotation.y = -0.3 * Math.PI;
    scene.add(plane);

    const boxGeometry = new three.BoxGeometry(20, 10, 10);
    const boxMaterial = new three.MeshLambertMaterial({
      color: 0x00ff00,
      // wireframe: true,
    });
    const cube = new three.Mesh(boxGeometry, boxMaterial);
    cube.position.set(-40, 10, 5);
    cube.castShadow = true;
    scene.add(cube);

    const sphereGeometry = new three.SphereGeometry(20, 12, 12);
    const sphereMaterial = new three.MeshPhongMaterial({
      color: 0xaabbcc,
      // wireframe: true,
    });
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(40, 20, 1);
    sphere.castShadow = true;
    scene.add(sphere);
    camera.lookAt(scene.position);

    // 点光源
    // const pointLight = new three.PointLight(0xffffff);
    // pointLight.position.set(20, 20, 400);
    // scene.add(pointLight);
    const spotLight = new three.SpotLight(0xffffff);
    spotLight.position.set(-200, 40, -20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new three.Vector2(1024, 1024);
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    const ambientLight = new three.AmbientLight(0x404040);
    scene.add(ambientLight);

    const renderer = new three.WebGLRenderer();
    renderer.setClearColor(new three.Color(0x404040));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    console.log(renderer);
    const renderBody = window.document.getElementById("threejs_demo1_body");
    if (renderBody) renderBody.appendChild(renderer.domElement);
    console.log("scene", scene);
    renderer.render(scene, camera);

    let step = 0;
    this.gui.add(controls, "rotationSpeed", 0, 0.5);
    this.gui.add(controls, "bouncingSpeed", 0, 0.5);
    console.log("gui", this.gui);
    function animate(): void {
      requestAnimationFrame(animate);
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;
      step += controls.bouncingSpeed;
      sphere.position.x = 30 + 10 * Math.cos(step);
      sphere.position.y = 20 + 10 * Math.abs(Math.sin(step));
      renderer.render(scene, camera);
    }
    animate();
  }
}
</script>
