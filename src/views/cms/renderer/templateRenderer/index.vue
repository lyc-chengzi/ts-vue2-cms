<template>
    <div
        v-if="json"
        class="template-renderer-page"
        :id="json.id"
        :style="json.css"
        :data-itcode="itcode"
    >
        <layout-renderer
            v-for="state in json.children"
            :key="state.id"
            :state="state"
            :parentId="json.id"
        ></layout-renderer>
    </div>
</template>

<style lang="less">
.template-renderer {
    position: relative;
}
</style>

<script lang="ts">
import TemplateRenderer from "./index";
export default TemplateRenderer;
</script>
