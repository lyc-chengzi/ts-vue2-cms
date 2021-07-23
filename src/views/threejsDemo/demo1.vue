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
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(75, width / 500, 0.2, 1000);

    const geometry = new three.BoxGeometry();
    const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 2;

    const renderer = new three.WebGLRenderer();
    renderer.setSize(width, 500);
    console.log(renderer);
    const renderBody = window.document.getElementById("threejs_demo1_body");
    if (renderBody) renderBody.appendChild(renderer.domElement);

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
