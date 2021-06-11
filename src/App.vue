<template>
<div>
    <div id="nav">
<!--    <div class="navBar">
      <router-link to="/index/main">首页</router-link> |
      <router-link to="/signIn?userCode=0010002">登录</router-link>|
      <router-link to="/index/upgrade">升级</router-link> |
      <router-link to="/index/store">商店</router-link>|
      <router-link to="/joinUs">加入我们</router-link> |
      <router-link to="/setings">个人中心</router-link>
    </div> -->
  </div>
  <router-view/>
</div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navBar {
  position: fixed;
  width: 80px;
  min-height: 200px;
  top: 90px;
  right: 20px;
  background-color: pink;
  z-index: 999;
  a {
    display: block;
  }
}
</style>
