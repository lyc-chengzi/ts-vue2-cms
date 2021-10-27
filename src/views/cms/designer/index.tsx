import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";
import "./index.less";
import DesignerRight from "./rightPanel";
import DesignerLeft from "./leftPanel";
import DesignerMain from "./mainPanel";
import { commit_app_init_designer_page } from "@/store";
import registerComponent from "../renderer/templateRenderer/componentRegister";
import { mapGetters } from "vuex";

@Component<Designer>({
    name: "designer-page",
    components: {
        DesignerRight,
        DesignerLeft,
        DesignerMain,
    },
    computed: {
        ...mapGetters(["pages"]),
    },
    created(): void {
        this.initComponentList();
    },
    mounted(): void {
        console.log(this.$route.meta);
    },
})
export default class Designer extends Vue {
    initComponentList() {
        // @ts-ignore
        if (this.pages.length === 0) {
            this.$store.commit(commit_app_init_designer_page);
            registerComponent(this.$store.state.componentList);
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
