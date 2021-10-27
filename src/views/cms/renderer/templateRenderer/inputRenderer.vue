<template>
    <a-input
        :placeholder="state.props.placeholder"
        :defaultValue="state.props.defaultValue"
        :style="state.css"
        v-model="state.props.value"
    ></a-input>
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
@Component<TemplateInputRenderer>({
    name: "template-input-renderer",
})
export default class TemplateInputRenderer extends Vue {
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
