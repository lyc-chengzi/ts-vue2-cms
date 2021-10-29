<template>
    <div class="cms-demo2">
        <template-renderer :json="jsonData"></template-renderer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import TemplateRenderer from "../renderer/templateRenderer/index.vue";
import jsonData from "./demo1.data";

export default Vue.extend({
    components: {
        "template-renderer": TemplateRenderer,
    },
    computed: {
        ...mapState(["pages", "selectedPage"]),
    },
    data: function (): any {
        return {
            jsonData,
        };
    },
});
</script>
