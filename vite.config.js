import {resolve} from "path";

export default {
    base: "",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                resume: resolve(__dirname, "src/pages/resume/index.html"),
            }
        }
    }
}