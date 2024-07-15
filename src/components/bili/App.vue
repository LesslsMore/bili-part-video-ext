<template>
  <div class="app">
    <!--        <el-scrollbar>-->
    <!--        </el-scrollbar>-->
    <div class="layout_container">
<!--      <RouterLink to="/indexed">indexed</RouterLink>&nbsp;&nbsp;-->
<!--      <RouterLink to="/storage">storage</RouterLink>&nbsp;&nbsp;-->
<!--      <RouterView></RouterView>-->
      <Head></Head>
      <Left></Left>
      <Body></Body>
      <Right></Right>
      <!--      <Foot></Foot>-->
    </div>

  </div>

</template>

<script setup>
import Head from "@/src/layout/Head.vue"
import Left from "@/src/layout/Left.vue"
import Body from "@/src/layout/Body.vue";
import Right from "@/src/layout/Right.vue";
import Foot from "@/src/layout/Foot.vue"
</script>

<style scoped lang="scss">
//.layout_container {
//  width: 100%;
//  height: 100vh;
//}
</style>

