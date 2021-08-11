<template>
    <div class="template-renderer-page" :id="json.id" :style="json.css">
        <layout-renderer
            v-for="element in json.children"
            :key="element.id"
            :element="element"
        ></layout-renderer>
    </div>
</template>

<style lang="less">
.template-renderer {
    position: relative;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { PropType } from "vue";
import { EnumComponentType } from "@/enum";
import TemplateLayoutRenderer from "./layoutRenderer.vue";

@Component<TemplateRenderer>({
    name: "template-renderer",
    props: {
        json: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
    components: {
        [EnumComponentType.layout]: TemplateLayoutRenderer,
    },
    mounted: function (): void {
        console.log("template renderer: json ->", this.json);
    },
})
export default class TemplateRenderer extends Vue {
    @Prop() public json?: IPageJSONConfig;
}
</script>
