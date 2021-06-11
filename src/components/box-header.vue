<template>
	<div class="hd">
		<div class="hd-c">
			<div>Messages</div>
			<div>Notifications</div>
			<div>
				<el-dropdown>
					<div class="el-dropdown-link">
						<span class="dropdown-title">
							{{ topthree }}
						</span>
					</div>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item >
								<div class="el-dropdown-link" @click="goJonUS()">
									<span>我的个人主页</span>
								</div>
								<div class="el-dropdown-link" @cilck="setings()">
									<span>资料编辑</span>
								</div>
								<div class="el-dropdown-link" @click="logout()">
									<span>退出</span>
								</div>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div>
				<el-dropdown>
					<div class="el-dropdown-link">
						<el-avatar :src="topFore.img" :size="20"></el-avatar><span class="dropdown-title">
							{{ topFore.title }}
						</span>
					</div>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(item, index) in topForeList" :key="index">
								<div class="el-dropdown-link" @click="hangeChangeLange(item)">
									<el-avatar :src="item.img" :size="20"></el-avatar>
									<span>{{ item.title }}</span>
								</div>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
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
		data() {
			return {
				topthree: "alexadner",
				topFore: {
					img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
					title: "EN",
				},
				topForeList: [{
						img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
						title: "简体中文",
					},
					{
						img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
						title: "繁体中文",
					},
					{
						img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
						title: "EN",
					},
				],
			}
		},
		mounted() {
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
			hangeChangeLange(item) {
				console.log(item)
				this.topFore = item
			},
			setings() {
				this.$router.push("/setings");
			},
			logout() {
				Cookies.set("kh", "");
				Cookies.set("openid", "");
				this.$router.push("/signIn");
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
					that.topthree = result.name;
				} else {

				}
			},
		},
	}
</script>

<style lang="less" scoped>
	.hd {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		cursor: pointer;
	}

	.hd-c {
		display: flex;
		padding: 0 10px;
		font-size: 15px;
		color: #ffffff;

		background-image: linear-gradient(#a48673, #a48673),
			linear-gradient(#a49672, #a49672);

		&>div {
			padding: 13px 8px;
		}

		&>div:last-child {
			padding: 13px 12px;
		}
	}

	.hd .el-dropdown-link {
		display: flex;
		align-items: center;
	}

	.dropdown-title {
		margin-left: 5px;
		color: #ffffff;
	}
</style>
