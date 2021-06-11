<template>
  <div class="dynamic">
    <div class="title">NEWSFEED</div>  <!-- 动态 -->
	
    <div class="list">
		<div  v-for="item in firendJson" :key="item.id">
			<div class="item">
			  <div class="left">
			    <img :src="item.avatar" alt="" />
			    <span class="text">
			      <span class="name">{{ item.name }} </span>
			      {{ item.act }}
			    </span>
			  </div>
			  <div class="time">{{ item.actDate }}</div>
			</div>
		</div>

	  
	  
     <!-- <div class="item">
        <div class="left">
          <img src="../assets/img/head.png" alt="" />
          <span class="text">
            <span class="name">cindy </span>
            上传了1张图片到相册
            <span class="name">动态图片 </span>
          </span>
        </div>
        <div class="time">4月17</div>
      </div>
      <div class="info">
        <div>孤独一掷，自饮~</div>
        <img src="../assets/img/six.png" alt="" />
      </div>
      <div class="item">
        <div class="left">
          <img src="../assets/img/head.png" alt="" />
          <span class="text">
            <span class="name">cindy </span>
            加入我们的网络~
          </span>
        </div>
        <div class="time">4月17</div>
      </div>
      <div class="item">
        <div class="left">
          <img src="../assets/img/head.png" alt="" />
          <span class="text">
            <span class="name">cindy </span>
            加入我们的网络~
          </span>
        </div>
        <div class="time">4月17</div>
      </div> -->
    </div>
    <div class="view">
      <div class="btn">VIEW MORE</div>
    </div>
  </div>
</template>

<script>

  import {
    RequestApi
  } from "@/api/demo.js";
  import Cookies from 'js-cookie';
  import {
    getQueryVariable
  } from "@/utils/request";
  export default {
    name: "",
    props: {},
    data() {
      return {
        firendJson: [
          // {
          //   headPic: require("@/assets/img/shuaige.png"),
          //   nicName: "tony · Wang",
          //   age: "28",
          //   sex: 1,
          //   intro:
          //     "往事飘零，爱恨随意",
          //   date: "5月20",
          //   kh: 123,
          // },
          //  {
          //   headPic: require("@/assets/img/shaofu.jpg"),
          //   nicName: "心的2分之1",
          //   age: "28",
          //   sex: 1,
          //   intro:
          //     "最近没喝奶茶，宝宝都不甜了ヾ(o◕∀◕)ﾉヾ",
          //   date: "5月20",
          //   kh: 123,
          // },
        ],
      };
    },
    components: {},
    mounted() {
      this.getAct(1); //获取最新的动态
    },
    methods: {
      async message(item) {
        //消息中心
        this.$router.push({
          path: '/reply',
          query: {
            'userCode': item.kh
          }
        });
      },
      async getAct(type) {
        //获取动态，可以获取全部动态和个人的动态
        var that = this;
        var uri = "";
        uri = "https://mall02.keduozan.com/tools/MallSelect.ashx";
        var param = {
          action: "getAct2021",
          user: Cookies.get("kh"),
          queryUser: '', //查询指定会员的时候使用，必须是权限允许的会员
          sitenum: '18777777777',
          type: '1', //1是全部的动态， 2是自己的动态 3是自己关注的会员的动态 4,指定会员动态，后台有权限判断
          token: Cookies.get("token"),
        };
        var result = await RequestApi.post(uri, param);
        console.log(result);
        if (result.status == "1") {
          //that.firendJson = result.data;
          var data = result.data;
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var sData = {
                avatar: data[i].avatar,
                name: data[i].name,
                age: data[i].age,
                sex: data[i].sex,
                act: data[i].act,
                actDate: data[i].actDate,
                kh: data[i].kh,
              };
              that.firendJson.push(sData);
            }
          }
        } else {
          console.log("==================>用户没登录")
          this.$router.push("login");
        }
      },
    },
    computed: {},
    watch: {},
  };


</script>

<style lang="less" scoped>
.dynamic {
  min-height: 802px;
  width: 684px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #f1f1f1;
  position: relative;
  padding-bottom: 80px;
  .title {
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    border-radius: 4px 4px 0px 0px;
    background-color: #a48673;
    color: #ffffff;
    text-align: left;
    padding-left: 35px;
  }
  .list {
    padding: 16px 0 0 19px;
  }
  .item {
    display: flex;
    min-height: 50px;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-bottom: 36px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 50px;
      height: 50px;
    }
    .text {
      padding-left: 13px;
      .name {
        color: #a48673;
      }
    }
    .time {
      margin-right: 47px;
    }
  }
  .info {
    padding-bottom: 20px;
    div {
      padding-bottom: 10px;
    }
    text-align: left;
    padding-left: 60px;
  }
  .view {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    .btn {
      text-align: center;
      font-size: 16px;
      color: #fff;
      width: 147px;
      height: 30px;
      line-height: 30px;
      background-color: #a48673;
    }
  }
}
</style>
