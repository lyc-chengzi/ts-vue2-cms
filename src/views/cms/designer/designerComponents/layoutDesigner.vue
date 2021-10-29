<template>
    <Draggable
        class="layout-designer"
        :group="{ name: 'componentDesigner' }"
        :value="state.children"
        :class="'layout-designer-container'"
        @add="dragAdd"
        :data-designerid="state.id"
    >
        <LayoutRenderer :parentId="parentId" :state="state"></LayoutRenderer>
    </Draggable>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import Draggable from "vuedraggable";
import LayoutRenderer from "@/views/cms/renderer/templateRenderer/layoutRenderer.vue";
import { IComponentConfig } from "@/interface/cmsComponents";
import { getUUID } from "@/utils";
import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { commit_designer_dragAddComponent } from "@/store/modules/designer.module";
import { mapGetters } from "vuex";
export default Vue.extend({
    name: "layout-disigner",
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
    components: {
        LayoutRenderer,
        Draggable,
    },
    computed: {
        ...mapGetters("designer", ["dragComponent", "selectedComponent"]),
    },
    methods: {
        dragAdd(e: any) {
            const fromItem: HTMLLIElement = e.item;
            const fromType = fromItem.dataset["comptype"];
            this.$store.commit(`designer/${commit_designer_dragAddComponent}`, {
                component: this.dragComponent,
                parent: this.state,
            });
        },
    },
});
</script>
<style lang="less">
.layout-designer {
    position: relative;
}
</style>
