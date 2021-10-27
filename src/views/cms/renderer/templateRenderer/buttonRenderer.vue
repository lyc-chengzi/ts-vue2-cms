<template>
    <a-button
        :id="state.id"
        :type="state.props.type"
        :style="state.css"
        @click="clickHandler"
    >
        {{ state.props.text || "按钮" }}
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
