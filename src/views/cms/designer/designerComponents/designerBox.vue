<template>
    <div class="designer-box" @click.stop="selectComponent($event, state)">
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
    },
    methods: {
        selectComponent(e: any, state: IComponentConfig) {
            console.log("designer-box -------------->", e, state);
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
.layout-designer {
    position: relative;
}
</style>
