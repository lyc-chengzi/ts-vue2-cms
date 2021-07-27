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
    this.init();
  }
  init(): void {
    const width =
      document.getElementById("threejs_demo2_body")?.clientWidth || 0;
    const height =
      document.getElementById("threejs_demo2_body")?.clientHeight || 0;
    const scene = new three.Scene();

    // create a camera, which defines where we're looking at.
    const camera = new three.PerspectiveCamera(45, width / height, 0.1, 1000);

    // create a render and configure it with shadows
    const renderer = new three.WebGLRenderer();
    renderer.setClearColor(new three.Color(0x000000));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    const axes = new three.AxesHelper(30);
    scene.add(axes);

    // createTree(scene);
    // createHouse(scene);
    // createGroundPlane(scene);
    // createBoundingWall(scene);

    // create a cube
    var cubeGeometry = new three.BoxGeometry(4, 4, 4);
    var cubeMaterial = new three.MeshLambertMaterial({
      color: 0xff0000,
    });
    var cube = new three.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 2;
    cube.position.z = 0;

    // add the cube to the scene

    var sphereGeometry = new three.SphereGeometry(4, 20, 20);
    var sphereMaterial = new three.MeshLambertMaterial({
      color: 0x7777ff,
    });
    var sphere = new three.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // create the ground plane
    var planeGeometry = new three.PlaneGeometry(60, 20);
    var planeMaterial = new three.MeshLambertMaterial({
      color: 0xaaaaaa,
    });
    var plane = new three.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;

    // add the objects
    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new three.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new three.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    // If you want a more detailled shadow you can increase the
    // mapSize used to draw the shadows.
    // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(spotLight);

    var ambienLight = new three.AmbientLight(0x353535);
    scene.add(ambienLight);
    document
      .getElementById("threejs_demo2_body")
      ?.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }
}
</script>
