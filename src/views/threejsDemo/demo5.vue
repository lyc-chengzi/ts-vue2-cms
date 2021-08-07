<style lang="less">
#threejs_demo5 {
    position: relative;
    .title {
        font-size: 20px;
        font-weight: 600;
        margin: 10px;
    }
    #threejs_demo5_body {
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
    name: "threejs-demo5",
})
export default class ThreejsDemo5 extends demoBase {
    containerId = "threejs_demo5_body";
    private title = "";
    private controlParams = {
        rotationSpeed: 0.02,
        numberOfObjects: this.scene.children.length,
        enableFog: () => {
            this.scene.fog = new three.Fog(0xffffff, 0.1, 100);
        },
        disableFog: () => {
            this.scene.fog = null;
        },
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
            const cubeGeometry = new three.BoxGeometry(
                cubeSize,
                cubeSize,
                cubeSize
            );
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
            <div id="threejs_demo5">
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
            (this.$route &&
                this.$route.meta &&
                (this.$route.meta.title as string)) ||
            "";
        this.init();
    }
    beforeDestroy(): void {
        this.gui.destroy();
    }
    init(): void {
        this.initHelper();
        this.addGUI();
        this.createPlane();
        this.initCamera();
        this.initLight();
        this.initRenderer();
        this.renderer.setClearColor(0xffffff);
        this.animate();
    }
    addGUI(): void {
        // gui
        this.gui.add(this.controlParams, "enableFog").name("启用雾化效果");
        this.gui.add(this.controlParams, "disableFog").name("关闭雾化效果");
        this.gui.add(this.controlParams, "addCube").name("添加物体");
        this.gui.add(this.controlParams, "removeCube").name("删除物体");
        this.gui.add(this.controlParams, "outputMesh").name("打印网格");
        this.gui
            .add(this.controlParams, "rotationSpeed", 0, 0.5)
            .name("旋转速度");
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
