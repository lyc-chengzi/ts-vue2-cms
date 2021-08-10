<template>
    <a-button :id="element.id" :type="element.props.type" :style="element.css">
        {{ element.props.text }}
    </a-button>
</template>

<style lang="less">
.template-root-renderer {
    position: relative;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageJSONConfig } from "@/interface/cmsComponents";
import { PropType } from "vue";
@Component<TemplateButtonRenderer>({
    name: "template-button-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
    mounted: function (): void {
        console.log("button renderer: element -> ", this.element);
    },
})
export default class TemplateButtonRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
}
</script>
