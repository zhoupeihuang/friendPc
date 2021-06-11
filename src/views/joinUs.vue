<template>
	<div class="joinUS">
		<div class="joinUS_container">
			<div class="f20 flex">加入我们的社区</div>
			<div class="mt-80 center f14 white">
				加入我们这个富有激情的社区。找到新朋友,约会,分享照片和视频。嗨起来!
			</div>
			<div class="flex flex__middle ow_box_cap_empty mt-20 h-30">
				<div class="ml-10">
					<img src=".././assets/img/person.png" />
				</div>
				<div class="ml-8 pt-8 pb-8 pl-8 f14">注册您的个人资料</div>
			</div>
			<div class="content-center white">
				<div class="table">
					<div class="t-title">基本资料</div>
					<div>
						<div class="item">
							<div>用户名</div>
							<div>
								<input type="text" v-model="name" />
							</div>
							<div>必须包含字母和数字</div>
						</div>
						<div class="item">
							<div>邮箱</div>
							<div>
								<input type="text" v-model="email" />
							</div>
							<div>必须是有效的</div>
						</div>
						<div class="item">
							<div>密码</div>
							<div>
								<input type="text" v-model="password" />
							</div>
							<div></div>
						</div>
						<div class="item">
							<div>再次输入密码</div>
							<div>
								<input type="text" v-model="two" />
							</div>
							<div></div>
						</div>
						<div class="item">
							<div>性别</div>

							<div class="sex" >
								<el-radio v-model="radio" label="1">男</el-radio>
								<el-radio v-model="radio" label="2">女</el-radio>
							</div>
							<div></div>
						</div>
						<div class="item">
							<div>生日</div>
							<div>
								<el-date-picker v-model="birthdayText" type="date" placeholder="选择日期">
								</el-date-picker>
							</div>
							<div></div>
						</div>
						<div class="item">
							<div>国家</div>
							<div>
								<input type="text" v-model="city" />
							</div>
							<div>来自哪个国家?</div>
						</div>
					</div>
				</div>
				<div class="table">
					<div class="t-title">服务条款</div>
					<div>
						<div class="item">
							<div>
								<span>我同意</span><span class="text_color">服务条款</span>
							</div>
							<div>
								<el-checkbox v-model="checked"></el-checkbox>
							</div>
							<div></div>
						</div>
					</div>
				</div>
				<div class="change mb-30 fr">
					<div class="text" @click="regin()">
						<span>注册</span>
						<img src="@/assets/img/icon1.png" alt="" />
					</div>
				</div>
			</div>
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
				name: "",
				email: "",
				password: "",
				two: "",
				sex:"",
				radio: "1",
				birthdayText: "",
				city: "",
				checked: true,
				languageLib: {
					lang_1: {
						basicInfo: 'basic info',
						username: 'username',
						email: 'email',
						password: 'password',
						passwordAgain: 'password again',
						gender: 'gender',
						male: 'male',
						female: 'female',
						birthday: 'birthday',
						country: 'country',
						serviceCondition: 'service condition',
						agree: 'agree',
						register: 'register',
						chooseDate: 'choose date',
						chooseCountry: 'choose country',
						chooseBirthday: 'choose your birthday...',
						chooseRegion: 'choose your region...',
						china: 'China',
						usa: 'USA',
						tipUsername: 'Please Input username',
						tipEmail: 'Please Input Email',
						tipEmailNotPass: 'check email failed',
						tipPassword: 'Please Input Password',
						tipPwd2: 'Please Input Same Password',
						minPasswordLength: 'min Password Length 6'
					},
					lang_2: {
						basicInfo: '基础信息',
						username: '用户名',
						email: '邮箱',
						password: '密码',
						passwordAgain: '再次输入密码',
						gender: '性别',
						male: '男',
						female: '女',
						birthday: '生日',
						country: '国家',
						serviceCondition: '服务条款',
						agree: '同意',
						register: '注册',
						chooseDate: '选择年月日',
						chooseCountry: '请选择所在国家',
						chooseBirthday: '点击选择生日...',
						chooseRegion: '点击选择地区...',
						china: '中国',
						usa: '美国',
						tipUsername: 'Please Input username',
						tipEmail: 'Please Input Emal',
						tipEmailNotPass: 'check email failed',
						tipPassword: 'Please Input Password',
						tipPwd2: 'Please Input Same Password',
						minPasswordLength: '密码长度最小6位'
					},
					lang_3: {
						basicInfo: '基礎信息',
						username: '用戶名',
						email: '郵箱',
						password: '密碼',
						passwordAgain: '再次輸入密碼',
						gender: '性別',
						male: '男',
						female: '女',
						birthday: '生日',
						country: '國家',
						serviceCondition: '服務條款',
						agree: '同意',
						register: '注冊',
						chooseDate: '選擇年月日',
						chooseCountry: '請選擇所在國家',
						chooseBirthday: '點擊選擇生日...',
						chooseRegion: '點擊選擇地區...',
						china: '中國',
						usa: '美國',
						tipUsername: '請輸入用戶名',
						tipEmail: '請輸入郵箱',
						tipEmailNotPass: '郵箱驗證不通過',
						tipPassword: '请输入密码',
						tipPwd2: '兩次密碼輸入不一致',
						minPasswordLength: '最小密碼長度為6位'
					}
				},
				currentLang: null
			}
		},
		components: {},
		beforeMount() {
			const language_id = Cookies.get('language_id') || 1;
			this.currentLang = this.languageLib['lang_' + language_id];
			this.birthdayText = this.currentLang.chooseBirthday;
			// this.nationText = this.currentLang.chooseRegion;
			// this.nationOptions[0].text = this.currentLang.china;
			// this.nationOptions[1].text = this.currentLang.usa;
		},
		mounted() {},
		methods: {
			async regin() {
				//注册
				if (this.name == "") {
					alert(this.currentLang.tipUsername);
					return;
				};
				if (this.email == "") {
					alert(this.currentLang.tipEmail);
					return;
				};
				var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
				if (re.test(this.email)) {

				} else {
					alert(this.currentLang.tipEmailNotPass);
					return false;
				}
				if (this.password == "") {
					alert(this.currentLang.tipPassword);
					return;
				};
				if (this.password.length <= 5) {
					alert(this.currentLang.minPasswordLength);
					return;
				};
				if (this.password != this.two) {
					alert(this.currentLang.tipPwd2);
					return;
				};
				var that = this;
				var uri = "";
				uri = "https://mall02.keduozan.com/tools/post.ashx";
				var param = {
					act: "adduser",
					tel: '',
					userpwd: this.password,
					yzm: '', //客户无短信，不需要短信验证码
					username: this.name, //目前注册没有名字，所以等于账号
					sex: this.sex,
					kh: this.name, //会员的用户名
					birthday: this.birthdayText,
					address: this.city,
					email: this.email,
					headimg: 'http://xcx01.keduozan.com/images/mrtx.jpg', //传一个默认头像
					fkfd: '', //这个会员对应的会员等级，不传值，后台自动用默认的等级
					sitenum: "18777777777",
					openid: "",
				};
				console.log( param);
				var result = await RequestApi.post(uri, param);
				// console.log(result);
				if (result.status == "1") {
					//注册成功后自动登录
					Cookies.set("kh", this.name);
					Cookies.set("openid", this.openid);
					Cookies.set("token", this.token); //每次登陆，token会变化，并且根据有效期会超时
					alert("注册成功");
					//延时跳转 让顾客看清提示
					setTimeout(() => {
						//需要延迟的代码 :3秒后延迟跳转到首页，可以加提示什么的
						this.$router.push("home");
						//延迟时间：3秒
					}, 500)

				} else {
					alert(result.rsg);
				}

				// that.userName = result.name;
				// that.userAddress = result.address;
			},
			details() {
				//查看服务协议
				this.$router.push({
					path: '/details',
					query: {}
				});
			},
		},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="less">
	.flex1 {
		display: flex;
		justify-content: center;
		align-self: center;
	}

	.joinUS {
		background: url(".././assets/img/background.png") repeat,
			linear-gradient(#8979a5, #9c6d97);

		.joinUS_container {
			margin: 0 auto;
			width: 1200px;
			word-wrap: break-word;
		}

		.ow_box_cap_empty {
			width: 744px;
			margin: 0 auto;
			background: #bba7c2;
			border: none;
			border-radius: 6px 6px 0px 0px;
			margin-bottom: 8px;
		}

		.content-center {
			.flex1;
			flex-direction: column;
			align-items: flex-end;
		}

		.change,
		.save {
			text-align: right;
			.flex1;
			justify-content: flex-end;

			.text {
				.flex1;
				font-size: 14px;
				// border: 1px solid @color;
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

		.table,
		.avatar-img {
			width: 744px;
			margin: 0 auto;
			text-align: right;
			border: 1px solid #ba9eba;
			margin-bottom: 20px;

			.t-title {
				.flex1;
				background: #bba7c2;
				padding: 15px 0;
			}

			.item {
				.flex1;
				border-bottom: 1px solid #ba9eba;

				&:nth-last-child(1) {
					border: none;
				}

				div {
					flex: 1;
					.flex1;
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

		.text_color {
			color: #7ce6fe;
		}
	}
</style>
