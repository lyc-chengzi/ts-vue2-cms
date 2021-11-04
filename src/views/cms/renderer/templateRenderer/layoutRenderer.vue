<template>
    <!--只渲染layout组件-->
    <a-layout
        class="tdp-layout-renderer designer-comp"
        v-if="state.type === componentType"
        :id="state.id"
        :style="combiCss"
        :data-id="state.id"
    >
        <template v-if="_isDesignMode">
            <Draggable
                :data-id="state.id"
                :group="{ name: 'componentDesigner' }"
                class="layout-renderer-designer"
                v-model="state.children"
                @add="dragAddHandler"
                @change="dragChangeHandler"
            >
                <designer-box
                    v-for="child in state.children"
                    :key="child.id"
                    :state="child"
                    :parentId="state.id"
                >
                    <component
                        :is="child.type"
                        :state="child"
                        :parentId="state.id"
                        :mode="mode"
                        :id="child.id"
                    ></component>
                </designer-box>
                <!-- <component
                    class="designer-comp"
                    v-for="child in state.children"
                    :key="child.id"
                    :is="child.type"
                    :state="child"
                    :parentId="state.id"
                    :mode="mode"
                    :id="child.id"
                    :data-id="child.id"
                ></component> -->
            </Draggable>
        </template>
        <template v-else>
            <component
                v-for="child in state.children"
                :key="child.id"
                :is="child.type"
                :id="child.id"
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
    background-color: transparent;
}
.layout-renderer-designer {
    min-height: 100px;
}
</style>

<script lang="ts">
import LayoutRenderer from "./layoutRenderer";
export default LayoutRenderer;
</script>
