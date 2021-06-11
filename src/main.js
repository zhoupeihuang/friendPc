import Vue from 'vue'
import App from './App.vue'
import './assets/css/layout.less'

import "normalize.css/normalize.css" // CSS重置的现代替代方法

import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// import './registerServiceWorker'


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
