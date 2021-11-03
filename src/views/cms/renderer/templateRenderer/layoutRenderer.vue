<template>
    <!--只渲染layout组件-->
    <a-layout
        class="tdp-layout-renderer"
        v-if="state.type === componentType"
        :id="state.id"
        :style="combiCss"
    >
        <template v-if="_isDesignMode">
            <Draggable
                :options="{ group: { name: 'componentDesigner' } }"
                class="layout-renderer-designer"
                :value="state.children"
                @add="dragAddHandler"
                @change="dragChangeHandler"
            >
                <!-- <designer-box
                    v-for="child in state.children"
                    :key="child.id"
                    :state="child"
                    :parentId="state.id"
                >
                    <component
                        :is="child.type"
                        :state="child"
                        :parentId="state.id"
                        @click.stop="designerClickHandler($event)"
                    ></component>
                </designer-box> -->
                <component
                    v-for="child in state.children"
                    :key="child.id"
                    :is="child.type"
                    :state="child"
                    :parentId="state.id"
                    @click.stop="designerClickHandler($event)"
                ></component>
            </Draggable>
        </template>
        <template v-else>
            <component
                v-for="child in state.children"
                :key="child.id"
                :is="child.type"
                :state="child"
                :parentId="state.id"
            ></component>
        </template>
    </a-layout>
</template>

<style lang="less">
.tdp-layout-renderer {
    position: relative;
    text-align: left;
}
.layout-renderer-designer {
    min-height: 100px;
}
</style>

<script lang="ts">
import LayoutRenderer from "./layoutRenderer";
export default LayoutRenderer;
</script>
