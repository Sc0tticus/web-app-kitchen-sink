<template>
    <pre v-highlightjs="code"><code></code></pre>
</template>

<script>
    import Vue from "vue";
    import VueHighlightJS from "vue-highlightjs";
    Vue.use(VueHighlightJS);

    export default {
        props: {
            code: String
        }
    };
</script>

<style scoped lang="scss">
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";
    @import "../../node_modules/highlight.js/styles/dracula.css";

    pre {
        overflow-x: auto;
        code {
            @include code-font;
            padding: 21px;
        }
    }
</style>
