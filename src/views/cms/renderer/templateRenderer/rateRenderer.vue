<template>
    <a-rate :defaultValue="state.props.defaultValue"></a-rate>
</template>

<style lang="less">
.template-root-renderer {
    position: relative;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IComponentConfig } from "@/interface/cmsComponents";
import { PropType } from "vue";
@Component<TemplateRateRenderer>({
    name: "template-rate-renderer",
})
export default class TemplateRateRenderer extends Vue {
    @Prop({
        type: Object as PropType<IComponentConfig>,
        required: true,
    })
    public state?: IComponentConfig;
    @Prop({
        type: String,
        required: true,
        default: () => "",
    })
    public parentId?: string;
}
</script>
