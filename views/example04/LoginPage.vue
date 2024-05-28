<template>
  <div class="login">
    <form @submit.prevent="login" class="box">
      <p class="table">LOGIN</p>
      <br />
      <input v-model="UserName" type="text" placeholder="账号" name="account" />
      <input v-model="password" type="password" placeholder="密码" name="password" />
      <br />
      <button type="submit" @click="login" class="log">user login</button>
    </form>
  </div>

  <h2 class="h2color">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DefaultAccount:2021213098
  </h2>
  <br />

  <h2 class="h2color">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DefaultPassword:123456
  </h2>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let UserName = ref('2021213098')
let password = ref('123456')
let errorMessage = ref('登录失败')
const router = useRouter()

const login = function () {
  if (UserName.value === '2021213098' && password.value === '123456') {
    console.info('success')
    const currentRoute = router.currentRoute.value
    console.log(currentRoute.redirectedFrom)
    router.push('./MainPage')
  } else {
    console.error('登录失败')
    alert(errorMessage.value)
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('C:\workplace-vue\vue-examples\src\img\1.jpg');
  background-size: cover;
}
.login {
  width: 550px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.4)
  );
  /* 使背景模糊化 */
  backdrop-filter: blur(15px);
  box-shadow: 5 5 20px lightgreen;
  border-radius: 20px;
}
.table {
  font: 900 40px '';
  text-align: center;
  letter-spacing: 5px;
  color: #3d3d3d;
}
.box {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.box input {
  width: 400px;
  height: 100%;
  margin-bottom: 20px;
  outline: none;
  border: 0;
  padding: 10px;
  background-color: transparent;
  border-bottom: 3px solid rgb(56, 222, 172);
  font: 900 16px '';
  border-radius: 3px;
}
.log {
  text-align: center;
  display: inline-block;
  height: 55px;
  padding: 12px;
  font: 900 20px Georgia;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
  letter-spacing: 3px;
  cursor: pointer;
  background-image: linear-gradient(to left, yellow, rgba(52, 210, 21, 0.616));
}
.log:hover {
  background-color: red;
}
.h2color {
  color: rgb(42, 186, 19);
}
</style>
