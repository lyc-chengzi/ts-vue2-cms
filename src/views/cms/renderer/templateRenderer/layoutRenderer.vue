<template>
    <!--只渲染layout组件-->
    <a-layout
        v-if="state.type === componentType"
        :id="state.id"
        :style="combiCss"
    >
        <component
            :is="child.type"
            :state="child"
            v-for="child in state.children"
            :key="child.id"
            :parentId="state.id"
        ></component>
    </a-layout>
</template>

<style lang="less">
.template-root-renderer {
    position: relative;
}
</style>

<script lang="ts">
import LayoutRenderer from "./layoutRenderer";
export default LayoutRenderer;
</script>
