import { Vue } from "vue-property-decorator";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import * as three from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export default class DemoBase extends Vue {
  protected containerId = "threejs_demobase_body";
  protected gui = new GUI();
  protected container: HTMLDivElement | null = null;
  protected containerWidth = 0;
  protected containerHeight = 0;
  protected scene = new three.Scene();
  protected camera = new three.PerspectiveCamera();
  protected renderer = new three.WebGLRenderer();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected stats: Stats = new Stats();
  mounted(): void {
    this.container = document.getElementById(
      this.containerId
    ) as HTMLDivElement;
    this.containerWidth = this.container?.clientWidth || 0;
    this.containerHeight = this.container?.clientHeight || 0;
  }
  initHelper(): void {
    // stats
    this.container?.appendChild(this.stats.dom);
    // axesHelper
    const axes = new three.AxesHelper(30);
    this.scene.add(axes);
  }
  setRenderer(): void {
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.shadowMap.enabled = true;
    if (this.container) this.container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }
  createPlane(): void {
    const planeGeometry = new three.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new three.MeshLambertMaterial({ color: 0xffffff });
    const plane = new three.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    this.scene.add(plane);
  }
  setCamera(): void {
    this.camera = new three.PerspectiveCamera(
      45,
      this.containerWidth / this.containerHeight,
      1,
      1000
    );
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);
  }
  setLight(): void {
    const ambientLight = new three.AmbientLight(0x3c3c3c);
    this.scene.add(ambientLight);
    const spotlight = new three.SpotLight(0xffffff, 1.2, 150, 120);
    spotlight.position.set(-40, 60, -10);
    spotlight.castShadow = true;
    this.scene.add(spotlight);
  }
}
