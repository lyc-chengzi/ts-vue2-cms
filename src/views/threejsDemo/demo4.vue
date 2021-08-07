<template>
    <div id="threejs_demo4">
        <div class="title">{{ title }}</div>
        <div>加载进度 {{ progress }} %</div>
        <div id="threejs_demo4_body"></div>
    </div>
</template>

<style lang="less">
#threejs_demo4 {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    .title {
        font-size: 20px;
        font-weight: 600;
        margin: 10px;
    }
    #threejs_demo4_body {
        position: relative;
        height: 550px;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Camera, Group, Scene, WebGLRenderer } from "three";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";

window.THREE = three;
@Component({
    name: "threejs-demo4",
})
export default class ThreejsDemo4 extends Vue {
    title = "";
    progress = 0;
    container: HTMLDivElement | null = null;
    camera?: Camera;
    scene?: Scene;
    renderer?: WebGLRenderer;
    object?: Group;
    mounted(): void {
        this.title =
            (this.$route &&
                this.$route.meta &&
                (this.$route.meta.title as string)) ||
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
            "threejs_demo4_body"
        ) as HTMLDivElement;

        const width = this.container?.offsetWidth || 160;
        const height = this.container?.offsetHeight || 90;
        console.log(width, height);
        this.camera = new three.PerspectiveCamera(45, width / height, 0.25, 20);
        this.camera.position.set(-1.8, 0.6, 2.7);
        this.scene = new three.Scene();
        new RGBELoader()
            .setDataType(three.UnsignedByteType)
            // .setPath("/threejsAssets/textures/equirectangular/")
            .load("/threejsAssets/royal_esplanade_1k.hdr", (texture) => {
                const envMap =
                    pmremGenerator.fromEquirectangular(texture).texture;
                if (this.scene) {
                    this.scene.background = envMap;
                    this.scene.environment = envMap;
                }
                texture.dispose();
                pmremGenerator.dispose();
                this.render();
                if (this.renderer) {
                    const roughnessMipmapper = new RoughnessMipmapper(
                        this.renderer
                    );
                    const loader = new GLTFLoader();
                    loader.load(
                        "/threejsAssets/gltf/DamagedHelmet/DamagedHelmet.gltf",
                        (gltf) => {
                            gltf.scene.traverse((child) => {
                                console.log(child);
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                if (child.isMesh) {
                                    roughnessMipmapper.generateMipmaps(
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        child.material
                                    );
                                }
                            });
                            this.scene && this.scene.add(gltf.scene);
                            roughnessMipmapper.dispose();
                            this.render();
                        },
                        this.onProgress.bind(this)
                    );
                }
            });
        this.renderer = new three.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        this.renderer.toneMapping = three.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputEncoding = three.sRGBEncoding;
        this.container.appendChild(this.renderer.domElement);
        const pmremGenerator = new three.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        const controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        controls.addEventListener("change", this.render);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, -0.2);
        controls.update();
    };
    animate = (): void => {
        requestAnimationFrame(this.animate);
        this.render();
    };
    render = (): void => {
        if (this.camera && this.scene && this.renderer) {
            // console.log("render...");
            this.renderer.render(this.scene, this.camera);
        }
    };
}
</script>
