<template>
  <div class="app-page">
    <div class="container">
      <div class="c-title">資料編輯</div>
      <div class="change">
        <div class="text">
          <span>修改密码</span>
          <img src="@/assets/images/right.png" alt="" />
        </div>
      </div>
      <div class="content-center">
        <div class="table">
          <div class="t-title">基本资料</div>
          <div>
            <div class="item">
              <div>邮箱</div>
              <div>
                <input type="text" v-model="text" />
              </div>
              <div>必須是有效的</div>
            </div>
            <div class="item">
              <div>性别</div>

              <div class="sex">
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
              </div>
              <div></div>
            </div>
            <div class="item">
              <div>生日</div>
              <div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="avatar-img">
          <div class="a-title">用戶頭像</div>
          <div class="item">
            <div class="text">用戶頭像</div>
            <div class="img" style="justify-content: flex-start">
              <img src="@/assets/images/avatar.jpg" alt="" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="change">
        <div class="text">
          <span>保存</span>
          <img src="@/assets/images/down.png" alt="" />
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      tabList: [
        "Main",
        "Members",
        "Recharge",
        "Upgrade",
        "Store",
        "Photo",
        "Mails",
      ],
      text: "tiantian12@gmail.com",
      radio: "1",
      value1: "",
    }
  },
  components: {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
@color: #9c6d97;
.flex {
  display: flex;
  justify-content: center;
  align-self: center;
}

.top {
  padding-top: 457px;
  background: url("../assets/img/bg.png") no-repeat center / 100% 100%;
}
.sex {
  .flex;
  flex-direction: column;
  text-align-last: left;
  .el-radio:nth-child(2) {
    margin-top: 10px;
  }
}
.container {
  width: 980px;
  margin: 0 auto;
  margin-top: 20px;
  //   color: #fff;
  text-align: left;
  .c-title {
    font-size: 20px;
    font-weight: 700;
    color: #513b6e;
  }
  .change,
  .save {
    text-align: right;
    .flex;
    justify-content: flex-end;
    .text {
      .flex;
      font-size: 14px;
      border: 1px solid @color;
      padding: 8px 10px;
      background: #eaceee;
      border-radius: 5px;
      span {
        padding-right: 5px;
        margin-right: 5px;
        border-right: 1px solid #816b88;
      }
    }
  }
  .content-center {
    .flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .table,
  .avatar-img {
    width: 90%;
    text-align: right;
    // background: #7b6e95;
    margin-top: 40px;
    border: 1px solid #ba9eba;
    margin-bottom: 20px;
    .t-title {
      .flex;
      background: #bba7c2;
      padding: 15px 0;
    }
    .item {
      .flex;
      border-bottom: 1px solid #ba9eba;
      &:nth-last-child(1) {
        border: none;
      }
      div {
        flex: 1;
        .flex;
        padding: 20px 10px;
        &:first-child {
          justify-content: flex-end;
        }
        &:nth-child(2) {
          border-left: 1px solid #ba9eba;
          border-right: 1px solid #ba9eba;
          input {
            width: 100%;
            padding: 10px 0;
          }
        }
        &:nth-last-child(1) {
          justify-content: flex-start;
        }
      }
    }
  }
  .avatar-img {
    width: 90%;
    text-align: right;
    // background: #7b6e95;
    border: 1px solid #ba9eba;
    margin-bottom: 20px;
    .a-title {
      .flex;
      background: #bba7c2;
      padding: 15px 0;
    }
    .img {
    }
  }
}
.footer {
  margin-top: 50px;
  height: 100px;
  background: #b997ae;
}
</style>
