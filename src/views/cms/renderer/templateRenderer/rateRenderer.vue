<template>
    <a-rate :defaultValue="element.props.defaultValue"></a-rate>
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
@Component<TemplateRateRenderer>({
    name: "template-rate-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
})
export default class TemplateRateRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
}
</script>
