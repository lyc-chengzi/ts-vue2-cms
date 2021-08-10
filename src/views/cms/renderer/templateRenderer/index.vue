<template>
    <div class="template-renderer">
        <div :id="json.id" class="template-root-renderer">
            <component
                v-for="element in json.children"
                :key="element.id"
                :is="element.type"
                :element="element"
            ></component>
        </div>
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
import TemplateButtonRenderer from "./buttonRenderer.vue";
import TemplateInputRenderer from "./inputRenderer.vue";
import TemplateRateRenderer from "./rateRenderer.vue";

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
        [EnumComponentType.button]: TemplateButtonRenderer,
        [EnumComponentType.input]: TemplateInputRenderer,
        [EnumComponentType.rate]: TemplateRateRenderer,
    },
    mounted: function (): void {
        console.log("template renderer: json ->", this.json);
    },
})
export default class TemplateRenderer extends Vue {
    @Prop() public json?: IPageJSONConfig;
}
</script>
