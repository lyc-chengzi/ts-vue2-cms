import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import "./index.less";
import DesignerRight from "./rightPanel";
import DesignerLeft from "./leftPanel";
import DesignerMain from "./mainPanel";
import Preview from "@/views/cms/renderer/templateRenderer/index.vue";
import { commit_designer_init_designer_page } from "@/store/modules/designer.module";
import { mapGetters } from "vuex";

@Component<Designer>({
    name: "designer-page",
    components: {
        DesignerRight,
        DesignerLeft,
        DesignerMain,
    },
    computed: {
        ...mapGetters("designer", ["pages", "selectedPage"]),
    },
    created(): void {
        this.initComponentList();
    },
    mounted(): void {
        // console.log(this.$route.meta);
    },
})
export default class Designer extends Vue {
    public showPreviewModal = false;
    initComponentList(): void {
        // @ts-ignore
        if (this.pages.length === 0) {
            this.$store.commit(
                `designer/${commit_designer_init_designer_page}`
            );
        }
    }
    render(): VNode {
        // @ts-ignore
        const selectedPage = this.selectedPage;
        return (
            <div class="cms-designer-page">
                <div class="cms-designer-toolbar">
                    <a-button
                        onClick={() =>
                            (this.showPreviewModal = !this.showPreviewModal)
                        }
                    >
                        预览
                    </a-button>
                </div>
                <div class="cms-designer">
                    <DesignerLeft class="left" />
                    <DesignerMain class="body" />
                    <DesignerRight class="right" />
                </div>
                <a-modal
                    dialog-class="preview-dialog"
                    v-model={this.showPreviewModal}
                    footer={null}
                >
                    <Preview json={selectedPage}></Preview>
                </a-modal>
            </div>
        );
    }
}
