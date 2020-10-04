import Vue from "vue";
import {Component, Inject, Prop} from "vue-property-decorator";
import World from "../../../cuber/world";
import {PreferanceData} from "../../../data";

@Component({
    template: require("./index.html"),
})
export default class Appear extends Vue {
    @Inject("world")
    world: World;

    @Inject("preferance")
    preferance: PreferanceData;

    @Prop({required: true})
    value: boolean;
    width = 0;
    height = 0;
    size = 0;

    constructor() {
        super();
    }

    get show(): boolean {
        return this.value;
    }

    set show(value) {
        if (!value) {
            this.preferance.save();
        }
        this.$emit("input", value);
    }

    mounted(): void {
        this.resize();
    }

    resize(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
    }
}
