<template>
	<div class="signIn">
		<div class="box">
			<div class="form">
				<div class="title">SIGN IN</div>
				<el-form ref="form" :model="form" class="el-form-box">
					<el-form-item>
						<el-input v-model="form.name" ref="userCode" placeholder="Please enter the account number">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="form.pwd" ref="pwd" placeholder="Please input a password"></el-input>
					</el-form-item>
					<el-form-item class="forgot" @click="forgot()">
						<el-checkbox v-model="form.checked">Remember me</el-checkbox>
						<span>Forgot password</span>
					</el-form-item>
					<el-form-item>
						<div class="btn" @click="login()">SIGN IN</div>
					</el-form-item>
					<el-form-item>
						<el-button type="text" @click="joinUS()">JOIN</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="app">
				<img src="../assets/img/qr.png" alt="" />
				<div class="text">手机扫码进行访问</div>
			</div>
		</div>
		<div class="about">
			About us | Terms of use | Privacy Policy | Refund and cancellation | Help Center |
			Contact Us
		</div>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import {
		getDemoData,
		postDemoData,
		getUrlDemoData
	} from "@/api/demo";
	import {
		RequestApi
	} from "@/api/demo.js";
	import {
		getQueryVariable
	} from "@/utils/request";
	export default {
		name: "",
		props: {},
		data() {
			return {
				form: {
					name: "",
					pwd: "",
					checked: true,
				},
			};
		},
		components: {},
		mounted() {
			// 初始判断 跳转那个地方
			//判断不准确，先屏蔽了。。。。
			if (this.isMobile) {
				console.log("移动端");
				// window.location.href = "https://baidu.com/"

			} else {
				console.log("pc端");
				// window.location.href = "https://bing.com/"

			}

			// 获取url
			// console.log(this.$route.query.userCode);
			// Cookies.set("name", "value");
		},
		methods: {

		   isMobile() {
       var browser = {
            versions: function() {
                var u = navigator.userAgent;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核 
                    presto: u.indexOf('Presto') > -1, //opera内核 
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') &&
                        u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0, //是否为移动终端 
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad 
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
                }
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
      // console.log("语言版本:" + browser.language, "是否为移动终端: " + browser.versions.mobile);　　
         
      return browser.versions.mobile;
    },
			init() {

				// let params = {
				// 	name: "123",
				// 	pwd: 4356
				// };
				// postDemoData(params)
				// 	.then((res) => {
				// 		console.log(res.data);
				// 	})
				// 	.catch((e) => {
				// 		console.log(e);
				// 	});
			},
			init2() {
				// let params = {
				// 	name: "123",
				// 	pwd: 4356
				// };
				// getDemoData(params)
				// 	.then((res) => {
				// 		console.log(res.data);
				// 	})
				// 	.catch((e) => {
				// 		console.log(e);
				// 	});
			},

			initUrl() {
				// console.log(this.$route.query.userCode);
				// let userCode = this.$route.query.userCode;
				// getUrlDemoData(userCode)
				// 	.then((res) => {
				// 		console.log(res.data);
				// 	})
				// 	.catch((e) => {
				// 		console.log(e);
				// 	});
			},
			joinUS() {
				this.$router.push("/joinUS");
			},
			async login() {
				if (this.$refs.userCode.value == "") {
					alert("请输入账号");
					return;
				};
				if (this.$refs.pwd.value == "") {
					alert("请输入密码");
					return;
				};
				var that = this;
				var uri = "";
				uri = "https://mall02.keduozan.com/tools/post.ashx";
				var param = {
					act: "login",
					usernum: this.$refs.userCode.value,
					userpwd: this.$refs.pwd.value, //要加密一下
					sitenum: "18777777777",
					openid: "",
				};
				var result = await RequestApi.post(uri, param);
				console.log(result);
				if (result.status == "1") {
					Cookies.set("kh", this.$refs.userCode.value);
					Cookies.set("openid", this.openid);
					Cookies.set("token", this.token); //每次登陆，token会变化，并且根据有效期会超时
					Cookies.set("code", '86C64761F192EA595591B4D473E87F0C');


					//跳转
					this.$router.push("index");
				} else {
					alert(result.msg);
				}

				that.userName = result.name;
				that.userAddress = result.address;
			},
			forgot() {
				this.$router.push("/forgot");
			},
		},
		computed: {},
		watch: {},
	};
</script>

<style scoped lang="less">
	.signIn {
		height: 100vh;
		background: url("../assets/img/signIn.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.box {
		width: 680px;
		height: 420px;
		background-color: #ffffff;
		opacity: 0.8;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.form {
		width: 300px;
		padding: 35px 0 0 23px;

		.title {
			text-align: center;
			font-size: 20px;
			height: 40px;
			background-color: #a48673;
			line-height: 40px;
			color: #fff;
			border-radius: 8px 8px 0px 0px;
		}

		.el-form-box {
			padding: 0 25px;
			padding-top: 43px;
			background: rgba(9, 6, 5, 0.2);
			border-radius: 0px 0px 8px 8px;
		}

		.forgot {
			span {
				padding-left: 17px;
				cursor: pointer;

				&:hover {
					color: #a48673;
				}
			}
		}

		.btn {
			width: 250px;
			height: 35px;
			border-radius: 4px;
			line-height: 35px;
			color: #fff;
			font-size: 16px;
			cursor: pointer;
			background-color: #a48673;
		}

		::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
			color: #a48673;
		}

		::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
		.el-checkbox__input.is-indeterminate .el-checkbox__inner {
			background-color: #a48673;
			border-color: #a48673;
		}
	}

	.app {
		margin-right: 110px;

		img {
			width: 164px;
			height: 164px;
		}

		.text {
			padding-top: 30px;
			font-size: 16px;
		}
	}

	.el-button--text {
		color: #000;
	}

	.about {
		position: absolute;
		bottom: 55px;
		font-size: 18px;
		color: #ffffff;
	}
</style>
