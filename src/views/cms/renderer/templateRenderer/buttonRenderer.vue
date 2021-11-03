<template>
    <a-button
        class="tdp-button-renderer"
        :id="state.id"
        :type="combieProps.type"
        :style="state.css"
        @click="clickHandler"
    >
        {{ combieProps.text }}
    </a-button>
</template>

<style lang="less">
.template-root-renderer {
    position: relative;
}
</style>

<script lang="ts">
import Button from "./buttonRenderer";
export default Button;
</script>
