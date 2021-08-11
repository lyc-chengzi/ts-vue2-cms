<template>
    <!--只渲染layout组件-->
    <a-layout
        v-if="element.type === elementType"
        :id="element.id"
        :style="element.css"
    >
        <component
            :is="child.type"
            :element="child"
            v-for="child in element.children"
            :key="child.id"
        ></component>
    </a-layout>
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
import TemplateButtonRenderer from "./buttonRenderer.vue";
import TemplateInputRenderer from "./inputRenderer.vue";
import TemplateRateRenderer from "./rateRenderer.vue";
import { EnumComponentType } from "@/enum";

interface IData {
    elementType: EnumComponentType;
}

@Component<TemplateLayoutRenderer>({
    name: "layout-renderer",
    props: {
        element: {
            type: Object as PropType<IPageJSONConfig>,
            required: true,
        },
    },
    data: function (): IData {
        return {
            elementType: EnumComponentType.layout,
        } as IData;
    },
    components: {
        [EnumComponentType.layout]: TemplateLayoutRenderer,
        [EnumComponentType.button]: TemplateButtonRenderer,
        [EnumComponentType.input]: TemplateInputRenderer,
        [EnumComponentType.rate]: TemplateRateRenderer,
    },
})
export default class TemplateLayoutRenderer extends Vue {
    @Prop() public element?: IPageJSONConfig;
}
</script>
