<template>
    <div class="cms-demo2">
        <template-renderer :json="json"></template-renderer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TemplateRenderer from "../renderer/templateRenderer/index.vue";
import jsonData from "./demo1.data";

export default Vue.extend({
    components: {
        "template-renderer": TemplateRenderer,
    },
    data: function () {
        return {
            json: jsonData,
        };
    },
});
</script>
