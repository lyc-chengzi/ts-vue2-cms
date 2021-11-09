<style lang="less">
// @import url("../styles/components/button.less");
@import url("../styles/index.less");
</style>
<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <button class="tdp-button large">大按钮</button>
        <button class="tdp-button mini">小按钮</button>
        <div id="helloWorldId" msg="你好啊"></div>
        <!-- <hello-world msg="你好"></hello-world> -->
    </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default {
    name: "Home",
    // components: {
    //   HelloWorld,
    // },
    asyncData(context: any) {
        const { route, store } = context;
        console.log("home.vue asyncData", route, store);
        return store.dispatch("fetchAccess", route.params.id);
    },
    mounted(): void {
        const hw = new HelloWorld({
            el: "#helloWorldId",
            propsData: {
                msg: "初始化msg",
                onClickMsg: function (): void {
                    console.log(this.$data);
                },
            },
        });
        setTimeout(() => {
            // console.log(hw);
            hw.msg = "动态修改的msg";
            // console.log(hw.$props);
        }, 2000);
    },
};
</script>
