<template>
	<div class="app-page">
		<div class="container">
			<main>
				<div class="title">会员与金币</div>
				<div class="pick">
					<div class="big">
						<div class="min"></div>
					</div>
					<span>爲自己充值</span>
				</div>
				<div class="card">
					<ul>
						<li v-for="(item, index) in card" :key="index">
							<div class="card-title">
								{{ item.name }}
							</div>
							<div class="use-list">
								<div v-for="(t, i) in item.items" :key="i" class="u-item">
									<img src="@/assets/images/yes.png" alt="" />
									<span>{{ t }}</span>
								</div>
							</div>
							<div class="vip-list">
								<div v-for="(t, i) in item.vip" :key="i" class="vip-item" @click="selectItem(t.index)"
									:class="selectMoney == t.index ? 'active' : ''">
									<div class="left">
										<div class="big">
											<div class="min"></div>
										</div>
										<div>{{ t.name }}</div>
									</div>
									<div class="right" v-show="selectMoney == t.index">
										<img src="@/assets/images/yes.png" alt="" />
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="pay">
					<div class="pay-title">金币（剩余：44107）</div>
					<div class="list">
						<div class="item" v-for="(item, index) in imgList" :key="index"
							:class="selectPay == index ? 'active' : ''" @click="selectPay = index">
							<div class="big">
								<div class="min"></div>
							</div>
							<div class="img">
								<img :src="item.path" alt="" />
							</div>
						</div>
						<div class="item last" @click="selectPay = 6" :class="selectPay == 6 ? 'active' : ''">
							<div class="big">
								<div class="min"></div>
							</div>
							<div class="right">
								<span>金幣支付</span>
								<img src="@/assets/images/account_gold.png" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div class="up">
					<div class="content">
						<span>
							立即升级
						</span>
						<img src="@/assets/images/right.png" alt="" />
					</div>
				</div>
			</main>
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
				card: [{
						name: " 金卡會員",
						items: [
							"允许个人资料上墙帖",
							"搜索用戶",
							"查看個人資料",
							"聊天發圖片免費",
							"允許在動態下面評論",
							"無免費條數限制",
							"允许發動態",
							"上传照片",
							"查看图片",
							"评论图片",
							"添加视频",
							"查看视频",
							"评论视频",
							"启用邮件对话框",
							"评论视频",
							"启用邮件对话框",
							"继续邮件对话框",
							"阅读聊天消息",
							"免費發送聊天消息",
							"啟用聊天輸入框",
							"阅读邮件",
							"继续聊天对话框",
							"免費使用翻譯",
						],
						vip: [{
								name: "388 USD/3月 129.33 USD/1月 優惠 31%",
								index: 0,
							},
							{
								name: " 188 USD/1月 188.00 USD/1月 優惠 0%",
								index: 1,
							},
							{
								name: " 588 USD/6月 98.00 USD/1月 優惠 47%",
								index: 2,
							},
							{
								name: " 588 USD/6月 98.00 USD/1月 優惠 47%",
								index: 3,
							},
						],
					},
					{
						name: "  銀卡會員",
						items: [
							"允许个人资料上墙帖",
							"搜索用戶",
							"查看個人資料",
							"聊天發圖片免費",
							"允許在動態下面評論",
							"無免費條數限制",
							"允许發動態",
							"上传照片",
							"查看图片",
							"评论图片",
							"添加视频",
							"查看视频",
							"评论视频",
							"启用邮件对话框",
							"评论视频",
							"启用邮件对话框",
							"继续邮件对话框",
							"阅读聊天消息",
							"免費發送聊天消息",
							"啟用聊天輸入框",
							"阅读邮件",
							"继续聊天对话框",
							"免費使用翻譯",
						],
						vip: [{
								name: " 18 USD/1月 18.00 USD/1月 優惠 0%",
								index: 4,
							},
							{
								name: "  38 USD/3月 12.66 USD/1月 優惠 29%",
								index: 5,
							},
							{
								name: " 58 USD/6月 9.66 USD/1月 優惠 46%",
								index: 6,
							},
							{
								name: "  88 USD/12月 7.33 USD/1月 優惠 59%",
								index: 7,
							},
						],
					},
				],
				imgList: [{
						path: require("@/assets/images/paypal_logo.png"),
					},
					// {
					//   path: require("@/assets/images/icepay-logo.png"),
					// },
					// {
					//   path: require("@/assets/images/ipapay-logo.png"),
					// },
					// {
					//   path: require("@/assets/images/icepay-logoM.png"),
					// },
					// {
					//   path: require("@/assets/images/five.png"),
					// },
					// {
					//   path: require("@/assets/images/six.png"),
					// },
				],
				tabList: [
					"Main",
					"Members",
					"Recharge",
					"Upgrade",
					"Store",
					"Photo",
					"Mails",
				],
				selectMoney: 0,
				selectPay: 0,
			}
		},
		components: {},
		mounted() {},
		methods: {
			selectItem(index) {
				//   console.log(index);
				this.selectMoney = index
			},
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

	.container {
		width: 1200px;
		margin: 0 auto;
		margin-top: 20px;
		text-align: left;
		color: @color;

		.active {
			border: 1px solid #ff4a53 !important;

			.min {
				display: block !important;
			}
		}

		.big {
			display: inline-block;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			border: 2px solid @color;
			margin-right: 5px;
			.flex;

			.min {
				display: inline-block;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background: @color;
				.flex;
			}
		}

		main {
			.title {
				font-size: 20px;
				font-weight: 700;
				color: #513b5a;
			}

			.pick {
				.flex;
				justify-content: flex-start;
				padding-left: 15px;
				margin: 20px 0;
			}

			.card {
				ul {
					width: 80%;
					.flex;
					justify-content: flex-start;
					list-style: none;

					li {
						flex: 1;
						border: 1px solid #dcdee1;

						.card-title {
							background: #d48bb8;
							color: #f7db85;
							font-size: 20px;
							font-weight: 700;
							padding: 10px;
							.flex;
						}

						.use-list {
							.flex;
							justify-content: flex-start;
							flex-wrap: wrap;
							height: 150px;
							margin-bottom: 30px;
							padding: 0 10px;
							overflow: auto;

							.u-item {
								width: 50%;
								padding: 10px 0;
								.flex;
								justify-content: flex-start;
							}
						}

						.vip-list {
							padding: 0 10px;
							margin-bottom: 20px;

							.vip-item {
								.flex;
								justify-content: space-between;
								padding: 15px 0;
								border: 1px solid transparent;
								border-bottom: 1px solid #dcdee1;
								border-radius: 10px;
								padding-left: 10px;
								font-size: 14px;
								height: 60px;

								.left {
									.flex;
									justify-content: flex-start;
								}

								.right {
									.flex;
								}

								.min {
									display: none;
								}

								img {
									width: 20px;
									height: 20px;
								}

								&:hover {
									border: 1px solid #ff4a53;
									background: #fff2f3;

									img {
										width: 20px;
										height: 20px;
									}

									.min {
										display: block;
									}
								}
							}
						}

						&:nth-child(1) {
							margin-right: 20px;
						}
					}
				}
			}

			.pay {
				.pay-title {
					margin: 20px 0;
					font-size: 14px;
					margin-left: -10px;
				}

				.list {
					width: 85%;
					.flex;
					justify-content: flex-start;
					flex-wrap: wrap;

					.item {
						width: 21%;
						.flex;
						justify-content: flex-start;
						border-radius: 10px;
						padding: 10px;
						margin-right: 20px;
						border: 1px solid #dcdee1;
						cursor: pointer;
						height: 60px;
						overflow: hidden;

						.min {
							display: none;
						}

						.img {
							.flex;
						}

						&:nth-child(n + 5) {
							margin-top: 20px;
						}

						img {
							width: 134px;
							// height: 30px;
						}

						&:hover {
							border: 1px solid #ff4a53;
							background: #fff2f3;
						}
					}

					.last {
						.flex;
						justify-content: flex-start;

						.right {
							.flex;

							img {
								width: 20px;
								height: 20px;
								margin-left: 5px;
							}
						}
					}
				}
			}

			.up {
				text-align: right;
				margin-right: 20%;
				.flex;
				justify-content: flex-end;

				.content {
					padding: 8px 15px;
					border: 1px solid @color;
					border-radius: 5px;

					span {
						margin-right: 10px;
						border-right: 1px solid #999;
						color: #000;
					}
				}
			}
		}
	}

	.footer {
		margin-top: 50px;
		height: 100px;
		background: #b997ae;
	}
</style>
<style scoped></style>
