import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './router/permission'
import './assets/css/common.css'
import api from './api'
import './utils/init'
import './utils/eventbus'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
//text
//UEditor
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.prototype.$api=api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
