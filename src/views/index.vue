<template>
  <div>
    <boxHeader></boxHeader>
    <div class="top">
      <img class="main-log" src="../assets/img/main-logo.png" alt="" />
      <img class="top-img" src="@/assets/img/main-top.jpg" alt="" />
      <div class="tab-c">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="container tabs"
        >
          <el-tab-pane
            :label="item.label"
            :name="item.label"
            v-for="item in tabList"
            :key="item.label"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import boxHeader from "@/components/box-header"

export default {
  components: { boxHeader },
  data() {
    return {
      activeName: "Main",
      tabList: [
        {
          label: "Main",
          route: "Main",
        },
        {
          label: "Members",
        },
        {
          label: "Chat",
        },
        {
          label: "Recharge",
        },

        {
          label: "Upgrade",
          route: "Upgrade",
        },
        {
          label: "Store",
          route: "Store",
        },
        {
          label: "Photo",
        },
        {
          label: "Mails",
        },
      ],
    }
  },

  mounted() {
    this.activeName = this.$route.name
  },
  methods: {
    handleClick() {
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.activeName === this.tabList[i].label) {
          return this.$router.push({ name: this.tabList[i].route })
        }
      }
    },
  },
  computed: {},
  watch: {
    $route() {
      this.activeName = this.$route.name
    },
  },
}
</script>

<style scoped lang="less">
.top {
  position: relative;
  padding-top: 457px;
  .main-log {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 1075px;
    height: 320px;
  }
  .top-img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 457px;
    height: 477px;
  }
}

.container {
  margin: 0 auto;
  padding: 0 20px;
  width: 1160px;
}

.tab-c {
  background-image: linear-gradient(#a48673, #a48673),
    linear-gradient(#a49673, #a49673);
}
.tabs {
  color: #fff;
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
</style>
