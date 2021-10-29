import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import "./index.less";
import DesignerRight from "./rightPanel";
import DesignerLeft from "./leftPanel";
import DesignerMain from "./mainPanel";
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
        ...mapGetters("designer", ["pages"]),
    },
    created(): void {
        this.initComponentList();
    },
    mounted(): void {
        console.log(this.$route.meta);
    },
})
export default class Designer extends Vue {
    initComponentList(): void {
        // @ts-ignore
        if (this.pages.length === 0) {
            this.$store.commit(
                `designer/${commit_designer_init_designer_page}`
            );
        }
    }
    render(): VNode {
        return (
            <div class={this.$route.meta?.className}>
                <DesignerLeft class="left" />
                <DesignerMain class="body" />
                <DesignerRight class="right" />
            </div>
        );
    }
}
