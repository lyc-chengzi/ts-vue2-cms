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

@Component({
  name: "threejs-demo1",
})
export default class ThreejsDemo1 extends Vue {
  private title = "";
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
  createScene(): void {
    const width =
      document.getElementById("threejs_demo1_body")?.clientWidth || 0;
    const height =
      document.getElementById("threejs_demo1_body")?.clientHeight || 500;
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 800;

    const boxGeometry = new three.BoxGeometry(100, 100, 100);
    const boxMaterial = new three.MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(boxGeometry, boxMaterial);
    cube.position.set(-100, 100, 200);
    scene.add(cube);

    const sphereGeometry = new three.SphereGeometry(100, 50, 50);
    const sphereMaterial = new three.MeshPhongMaterial({
      color: 0xaabbcc,
    });
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(100, 100, 300);
    scene.add(sphere);
    camera.lookAt(sphere.position);

    const pointLight = new three.PointLight(0xffffff);
    pointLight.position.set(20, 20, 400);
    scene.add(pointLight);

    const ambientLight = new three.AmbientLight(0x404040);
    scene.add(ambientLight);

    const renderer = new three.WebGLRenderer();
    renderer.setClearColor(0xe8e8e8, 1);
    renderer.setSize(width, height);
    console.log(renderer);
    const renderBody = window.document.getElementById("threejs_demo1_body");
    if (renderBody) renderBody.appendChild(renderer.domElement);
    console.log("scene", scene);

    function animate(): void {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }
}
</script>
