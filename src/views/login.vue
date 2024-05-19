<template>
  <div>
    <div class="top">
      <div id="logo">
        <img
          src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
          alt=""
        />
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#ff5f16"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import Vue from "vue";
import axios from 'axios'
import { Form } from "vant";
import { Field } from "vant";
import { Button } from 'vant';

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      const autorization = response.headers.autorization
      autorization && localStorage.setItem('token',autorization)
      return response
    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      axios.post('http://localhost:3000/login',{
        username:values.username,
        password:values.password
      }).then(res=>{
        if(res.data.ok){
          this.$router.push('/center')
        }else{
          alert('账号或密码错误')
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
};
</script>
<style scoped>
.top {
  height: 200px;
  display: flex;
}
#logo {
  width: 60px;
  height: 60px;
  margin: auto;
}
#logo img {
  width: 100%;
}
</style>