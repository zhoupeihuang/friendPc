<template>
  <div class="top">
    <div class="tab-c">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="container tabs">
        <el-tab-pane
          :label="item"
          :name="item"
          v-for="item in tabList"
          :key="item"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "Main",
      tabList: ["Main", "Members", "Recharge", "Upgrade", "Store", "Photo", "Mails"],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log("======================>" + tab);
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-c {
  background-image: linear-gradient(#a48673, #a48673), linear-gradient(#a49673, #a49673);
}
.tabs {
  color: #fff;
}
::v-deep .el-tabs__item {
  text-align: center;
}
::v-deep .el-tabs__nav-wrap {
  height: 58px;
}
::v-deep .el-tabs__nav-scroll {
  display: inline-block;
}
::v-deep .el-tabs__nav-wrap::after {
  width: 0;
}

::v-deep .el-tabs__header {
  margin-bottom: 1px;
}

::v-deep .el-tabs__item.is-active {
  background-color: rgba(255, 255, 255, 0.16);
}

::v-deep .el-tabs__item.is-active {
  color: #fff;
}

::v-deep .el-tabs__item {
  color: #fff;
  padding: 0;
  width: 126px;
  height: 58px;
  line-height: 58px;
}

::v-deep .el-tabs__item:hover {
  background-color: rgba(255, 255, 255, 0.16);
}

::v-deep .el-tabs__active-bar {
  background: #fff;
}

.top {
  padding-top: 457px;
  background: url("../assets/img/bg.png") no-repeat center / 100% 100%;
}
</style>
