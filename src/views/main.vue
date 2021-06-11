<template>
	<section>
		<div class="swiperbox-container">
			<div class="swiper-c container">
				<div class="swiper-box">
					<div class="swiper-button-prev el-icon-arrow-left"></div>
					<div class="swiper-button-next el-icon-arrow-right"></div>
					<swiper :options="swiperOptionsObject" :auto-update="true" :auto-destroy="true"
						:delete-instance-on-destroy="true" :cleanup-styles-on-destroy="true">
						<swiper-slide class="slideitem"  v-for="item in memberList" :key="item.id">
							<img :src="item.avatar" alt="" />
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div>

		<div class="bottom container">
			<div class="btm-left">
				<div class="com-box">
					<div class="com-hd"></div>
					<div class="com-content">
						<div class=" area-1">
							<img src="../assets/img/chongzhi-2.png" alt="" />
							<span>{{money}}</span>
						</div>

						<div class="com-btn">
							<el-button class="btn">Buy more</el-button>
						</div>
					</div>
				</div>

				<!-- 				<div class="com-box">
					<div class="com-hd">USERS</div>
					<div class="com-content">
						<div class="com-radio">
							<el-radio-group v-model="radio1">
								<el-radio-button label="Latest"></el-radio-button>
								<el-radio-button label="Online"></el-radio-button>
							</el-radio-group>
						</div>

						<div class="area2-img">
							<img src="../assets/img/area2-avater.png" alt="" v-for="index in 7" :key="index" />
						</div>

						<div class="com-btn">
							<el-button class="btn">View all</el-button>
						</div>
					</div>
				</div> -->
				<!-- 
				<div class="com-box">
					<div class="com-hd">INVITE FRIENDS</div>
					<div class="com-content">
						<div class="area3-img">
							<img src="../assets/img/area3-em.png" alt="" />
						</div>

						<div class="com-btn">
							<el-button class="btn">Show Inviation Path</el-button>
						</div>
					</div>
				</div> -->

				<div class="com-box">
					<div class="com-hd">USERS</div>
					<div class="com-content">
						<div class="com-radio">
							<el-radio-group v-model="radio2">
								<el-radio-button label="Latest"></el-radio-button>
								<el-radio-button label="Top Rated"></el-radio-button>
							</el-radio-group>
						</div>

						<div class="area4-img">
							<div v-for="item in memberList" :key="item.id">
								<img :src="item.avatar" alt="" />
							</div>
						</div>

						<div class="com-btn">
							<el-button class="btn">Add new</el-button>
							<el-button class="btn">View all</el-button>
						</div>
					</div>
				</div>
			</div>

			<div class="btm-right">
				<dynamic></dynamic>
			</div>
		</div>
	</section>
</template>

<script>
	import dynamic from "@/views/dynamic"
	import {
		Swiper,
		SwiperSlide
	} from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.min.css'
	import {
		RequestApi
	} from "@/api/demo.js";
	import Cookies from 'js-cookie';
	import {
		getQueryVariable
	} from "@/utils/request";
	export default {
		components: {
			dynamic,
			Swiper,
			SwiperSlide
		},
		data() {
			return {
				memberList: [], //推荐的会员列表
				login: true,
				kh: '',
				userName: '',
				userTel: '',
				sitenum: '',
				money: '0.00',
				sblx: '',
				headimg: '',
				radio1: "Latest",
				radio2: "Latest",
				swiperOptionsObject: {
					effect: 'coverflow',
					loop: true,
					slidesPerView: "auto",
					spaceBetween: 165,
					coverflowEffect: {
						rotate: 15,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					},
					autoplay: true,
					autoplay: {
						delay: 2500,
						disableOnInteraction: false,
					},
					navigation: {
						nextEl: ".swiper-button-prev",
						prevEl: ".swiper-button-next",
					},
				},

			}
		},
		mounted() {
			var url = location.href;
			this.sitenum = getQueryVariable(url,
				"sitenum");
			this.kh = Cookies.get("kh");
			if (this.kh == undefined) {
				this.kh = "";
			}
			if (this.kh == "" || this.kh == null) {
				console.log("==================>用户没登录")
				this.$router.push("/signIn");
			} else {
				this.getUserInfo(); //获取用户信息，并且加载推荐的异性信息

			}

		},
		methods: {
			onSwiper(swiper) {
				console.log(swiper)
			},
			onSlideChange() {
				console.log("slide change")
			},
			async getUserInfo() {
				//获取用户信息，如果没登录，则跳转到登录
				var that = this;
				var uri = "";
				uri = "https://mall02.keduozan.com/tools/MallSelect.ashx";
				var param = {
					action: "getUserInfo",
					user: Cookies.get("kh"),
					sitenum: '18777777777',
					token: Cookies.get("token"),
				};
				var result = await RequestApi.post(uri, param);
				console.log(result);
				if (result.status == "1") {
					that.shopList = result.data;
					that.userName = result.name;
					that.userTel = result.tel;
					that.headimg = result.avatar;
					that.money = result.kje;
					Cookies.set("sex", result.sex);
					//用户信息加载后，才可以知道这个人是男是女，然后推荐对应的
					//随机加载50个异性会员
					this.getUserList(0); //随机在线的用户
				} else {

				}
			},
			async getUserList(type) {
				//给用户推荐50个异性用户
				this.type = type; //顶部选项页的选中index
				var that = this;
				var uri = "";
				uri = "https://mall02.keduozan.com/tools/MallSelect.ashx";
				var param = {
					action: "getUserList2021",
					user: Cookies.get("kh"),
					sex: Cookies.get("sex"),
					type: type,
					sitenum: '18777777777',
					token: Cookies.get("token"),
				};
				var result = await RequestApi.post(uri, param);
				// console.log(result);
				if (result.status == "1") {
					that.memberList = result.data;
				} else {

				}
			},
			async like(item) {
				//喜欢 关注
				//不传值，直接根据数据库是否关注反向切换
				var uri = "";
				uri = "https://mall02.keduozan.com/tools/MallSelect.ashx";
				var param = {
					action: "collection2021",
					user: Cookies.get("kh"),
					code: item.kh, //user kh 都是会员的账号，有些接口之前用的是kh
					type: '2', //2是收藏会员，1是收藏商品
					sitenum: '18777777777',
					token: Cookies.get("token"),
				};
				var result = await RequestApi.post(uri, param);
				console.log(result);
				if (result.status == "1") {
					//需要切换收藏图片状态
					location.reload(); //先刷新吧
				} else {}
			},
			logout() {
				//退出登录
				let openid = Cookies.get("openid");
				Cookies.set("kh", "");
				Cookies.set("openid", "");
				this.$router.push("login?openid=" + openid);
			},
			message(item) {
				//消息中心
				this.$router.push({
					path: '/chat',
					query: {
						'userCode': item.kh
					}
				});
			},
			email(item) {
				//邮件
				this.$router.push({
					path: '/reply',
					query: {
						'userCode': item.kh
					}
				});
			},
			gift(item) {
				//给这个会员送礼物
				this.$router.push({
					path: '/gift',
					query: {
						'type': 'sendgifts', //送礼状态下，不显示会员自己收到的礼物
						'userCode': item.kh
					}
				});
			},
			customerService() {
				//客服
				this.$router.push({
					path: '/reply',
					query: {
						'userCode': '01001'
					}
				});
			},
			viewDetails(item) {
				this.$router.push({
					path: '/userDet',
					query: {
						'userCode': item.kh
					}
				});
			},

		},

	}
</script>

<style scoped lang="less">
	.top {
		padding-top: 457px;
		background: url("../assets/img/bg.png") no-repeat center / 100% 100%;
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
		text-align: center;
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

	.swiperbox-container {
		background: url("../assets/img/bg-main-swiper.jpg") no-repeat center / 100% 100%;
	}

	.swiper-c {
		padding: 122px 0 72px;
		height: 369px;

		.swiper-box {
			position: relative;
			box-sizing: border-box;
			padding: 55px 115px;
			background-color: rgba(0, 0, 0, 0.4);
			overflow: hidden;
		}

		::v-deep .swiper-container {
			position: static;
		}

		.slideitem,
		::v-deep .swiper-slide {
			box-sizing: border-box;
			padding: 2px;
			// margin: 0 100px;
			background: #fff;
			height: 200px;
			width: 200px;
			overflow: hidden;

			img {
				height: 197px;
				width: 197px;
				vertical-align: middle;
			}
		}

		::v-deep .swiper-button-prev,
		::v-deep .swiper-button-next {

			width: 60px;
			height: 60px;
			text-align: center;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 50%;
			background-image: none;


		}

		::v-deep .swiper-button-prev::before,
		::v-deep .swiper-button-next:before {
			line-height: 60px;
			font-size: 45px;
			font-weight: 800;
			color: #fff;
		}

		:focus {
			outline: none;
		}
	}

	.bottom {
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
	}

	.btm-left {
		width: 453px;
		height: 100px;

		.com-box {
			padding-bottom: 10px;
			border-radius: 4px;

			overflow: hidden;

			.com-hd {
				padding-left: 46px;
				font-size: 16px;
				color: #fff;
				height: 32px;
				line-height: 32px;
				text-align: left;
				background-image: linear-gradient(rgba(164, 134, 115, 1),
						rgba(164, 134, 115, 1)),
					linear-gradient(rgba(164, 150, 115, 1), rgba(164, 150, 115, 1));
			}

			.com-content {
				padding-bottom: 15px;
				text-align: center;
				border: solid 2px rgba(241, 241, 241, 1);
				border-top: none;
				background-color: rgba(255, 255, 255, 1);
			}

			.com-btn {
				padding-right: 13px;
				display: flex;
				justify-content: flex-end;

				.btn {
					min-height: 0;
					height: 32px;
					line-height: 6px;
					font-size: 16px;
					color: rgba(102, 102, 102, 1);

					border: solid 2px rgba(225, 225, 225, 1);
				}

				.el-button:focus,
				.el-button:hover {
					color: rgba(102, 102, 102, 1);
					background-color: rgba(255, 255, 255, 1);
					border-color: #333;
				}
			}
		}
	}

	.area-1 {
		padding: 26px 0 15px;
		display: flex;
		justify-content: center;

		&>img {
			vertical-align: middle;
		}

		&>span {
			padding-left: 20px;
			font-weight: 600;
			height: 40px;
			line-height: 40px;
			font-size: 32px;
			color: rgba(236, 172, 69, 1);
		}
	}

	.com-radio {
		padding: 7px 11px 0 0;
		display: flex;
		justify-content: flex-end;

		::v-deep .el-radio-group {
			border-radius: 4px;
			border: solid 2px rgba(225, 225, 225, 1);
		}

		::v-deep .el-radio-button__inner {
			padding: 0 9px;
			height: 32px;
			line-height: 32px;
			font-size: 16px;
			color: rgba(102, 102, 102, 1);
			border: none;
			border-radius: 0;
		}

		::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
			background-color: rgba(225, 225, 225, 1);
			box-shadow: none;
		}

		::v-deep .el-radio-button__inner:hover {
			background-color: rgba(225, 225, 225, 0.3);
		}
	}

	.area2-img {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 16px 0 17px 22px;

		&>img {
			margin-right: 10px;
			vertical-align: middle;
			width: 50px;
			height: 50px;
		}
	}

	.area3-img {
		display: inline-block;
		padding: 10px;
		margin: 15px 0 18px;
		background-color: rgba(164, 134, 115, 1);
		border-radius: 8px;
	}

	.area4-img {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 16px 6px 17px;

		&>div {
			position: relative;
			margin: 0 6px 10px;
			width: 72px;
			height: 72px;
			border: solid 1px #ded7c6;

			img {
				position: absolute;
				top: 2px;
				left: 3px;
				width: 73px;
				height: 73px;
				vertical-align: middle;
			}
		}
	}

	.btm-right {
		width: 683px;
		height: 100%;
	}
</style>
