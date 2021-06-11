import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'


const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
export default new Router({
	routes: [{
			path: "/",
			name: "Home",
			component: Home,
			redirect: "/index",
		},
		{
			path: "/index",
			name: "index",
			component: () => import("../views/index.vue"),
			redirect: "/index/main",
			children: [{
					path: "main",
					name: "Main",
					component: () => import("../views/main.vue"),
				},

				{
					path: "upgrade",
					name: "Upgrade",
					component: () => import("../views/upgrade.vue"),
				},

				{
					path: "store",
					name: "Store",
					component: () => import("../views/store.vue"),
				},
				{
					path: "/setings",
					name: "setings",
					component: () => import("../views/setings.vue"),
				},
				{
					path: "/vip",
					name: "vip",
					component: () => import("../views/vip.vue"),
				},
			],
		},
		{
			path: "/joinUs",
			name: "joinUs",
			component: () => import("../views/joinUs.vue"),
		},
		{
			path: "/signIn",
			name: "signIn",
			component: () => import("../views/signIn.vue"),
		},
	]
})
