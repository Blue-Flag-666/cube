import Vue from "vue";
import {Component, Inject, Prop} from "vue-property-decorator";
import World from "../../../cuber/world";
import {COLORS} from "../../../cuber/define";
import {PaletteData} from "../../../data";

@Component({
    template: require("./index.html"),
})
export default class Palette extends Vue {
    @Inject("world")
    world: World;

    @Inject("palette")
    data: PaletteData;

    @Prop({required: true})
    value: boolean;
    width = 0;
    height = 0;
    size = 0;
    colors: { [key: string]: string };
    colord = false;
    face: string;
    colorv = "#FF0000";
    palette: string[] = [
        // DEFAULT
        "#B71C1C",
        "#FF6D00",
        "#0D47A1",
        "#00A020",
        "#FFD600",
        "#F0F0F0",
        // NORMAL
        "#FF0000",
        "#FFA100",
        "#0000FF",
        "#00FF00",
        "#FFFF00",
        "#808080",
        // OTHER
        "#FF0080",
        "#FF00FF",
        "#607D8B",
        "#00FFFF",
        "#795548",
        "#202020",
    ];

    constructor() {
        super();
        this.colors = COLORS;
    }

    get show(): boolean {
        return this.value;
    }

    set show(value) {
        if (!value) {
            this.data.save();
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

    tap(face: string): void {
        this.face = face;
        this.colord = true;
    }

    color(color: string): void {
        this.colord = false;
        this.data.color(this.face, color);
        this.data.save();
    }

    match(color: string): string {
        for (const key in COLORS) {
            if (color == COLORS[key]) {
                return key[0];
            }
        }
        return "";
    }
}
