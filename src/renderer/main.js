import Vue from 'vue'
import axios from 'axios'
import {
  ConfigProvider,
  Empty,
  Button,
  Card,
  Modal,
  FormModel,
  Input,
  Switch,
  Space,
  message,
  Select,
  Icon,
  Drawer,
  Layout
} from 'ant-design-vue'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ConfigProvider)
Vue.use(Empty)
Vue.use(Button)
Vue.use(Card)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Space)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Layout)
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
