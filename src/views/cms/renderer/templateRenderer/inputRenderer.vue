<template>
    <a-input
        :placeholder="element.props.placeholder"
        :defaultValue="element.props.defaultValue"
        :style="element.css"
        v-model="element.props.value"
    ></a-input>
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
@Component<TemplateInputRenderer>({
    name: "template-input-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
})
export default class TemplateInputRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
}
</script>
