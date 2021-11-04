<template>
    <div
        class="designer-box"
        @click.stop="selectComponent($event, state)"
        :style="combieCss"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { commit_designer_selectedComponent } from "@/store/modules/designer.module";
import { mapGetters } from "vuex";
import { getUUID } from "@/utils";
export default Vue.extend({
    name: "designer-box",
    props: {
        state: {
            type: Object as PropType<IComponentConfig>,
            required: false,
            default: () => {
                const id = `layout-designer-${getUUID}`;
                return {
                    id: id,
                    name: id,
                    type: EnumComponentType.layoutDesigner,
                    group: EnumComponentGroup.layout,
                    children: [],
                } as IComponentConfig;
            },
        },
        parentId: {
            type: String,
            required: true,
            default: () => "",
        },
    },
    computed: {
        ...mapGetters("designer", ["dragComponent", "selectedComponent"]),
        combieCss() {
            const defaultCss = {
                display: "block",
            };
            const css = this.state.css || {};
            return {
                display: css.display || defaultCss.display,
            };
        },
    },
    methods: {
        selectComponent(e: any, state: IComponentConfig) {
            this.$store.commit(
                `designer/${commit_designer_selectedComponent}`,
                {
                    component: state,
                }
            );
        },
    },
});
</script>
<style lang="less">
.designer-box {
    position: inherit;
}
</style>
