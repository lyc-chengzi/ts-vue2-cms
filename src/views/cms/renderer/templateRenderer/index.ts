import { Vue, Component, Prop } from "vue-property-decorator";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { PropType } from "vue";
import { EnumComponentType } from "@/enum";
import TemplateLayoutRenderer from "./layoutRenderer.vue";
import { mapState } from "vuex";

@Component<TemplateRenderer>({
    name: "template-renderer",
    components: {
        [EnumComponentType.layout]: TemplateLayoutRenderer,
    },
    mounted: function (): void {
        console.log("template renderer: json ->", this.json);
        console.log("store", this.$store.state);
    },
    computed: {
        ...mapState(["itcode", "selectedPage"]),
    },
})
class TemplateRenderer extends Vue {
    @Prop({
        type: Object as PropType<IPageModuleState>,
        required: false,
    })
    public json?: IPageModuleState;
}

export default TemplateRenderer;
