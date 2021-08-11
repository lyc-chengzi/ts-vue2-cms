<template>
    <a-button
        :id="element.id"
        :type="element.props.type"
        :style="element.css"
        @click="clickHandler"
    >
        {{ element.props.text || "按钮" }}
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
import { IButtonEvents } from "@/interface/cmsComponents/button";
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
    clickHandler(e: Event): void {
        const events = (this.element?.events || {}) as IButtonEvents;
        console.log("button renderer click event & events", e, events);
        if (events.onClick) events.onClick(e, this);
    }
}
</script>
