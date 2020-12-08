import Vue from 'vue'
import { Button, Form, FormItem, Input, Menu, MenuItem, Submenu, Header, Main, Container, Aside, Row, Col, Table, TableColumn, Card, Dialog, Transfer, MessageBox, Message, Option, Select } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Header)
Vue.use(Main)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Transfer)
Vue.use(Option)
Vue.use(Select)
