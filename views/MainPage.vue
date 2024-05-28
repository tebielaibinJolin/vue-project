<script setup lang="ts">
import router from '@/router/routes'

let show = true

const logout = () => {
  // 添加退出逻辑
  router.push('/login')
}
</script>

<template>
  <div>
    <header>
      <img src="C:\workplace-vue\vue-examples\src\img\2.jpg" alt="东北林业大学logo" class="logo" />
      <div class="user-info">
        <span></span>
        <button @click="logout" class="log">logout</button>
        <button @click="logout" class="log">help</button>
        <button @click="logout" class="log">translate</button>
      </div>
    </header>

    <div class="main-container">
      <nav>
        <ul>
          <li><RouterLink to="/example01">PersonalView</RouterLink></li>
          <li><RouterLink to="/example02">BookRoomView</RouterLink></li>
          <li><RouterLink to="/example03">CourseView</RouterLink></li>
        </ul>
      </nav>

      <main>
        <div v-if="show">
          <hr />
          东北林业大学是一所以林科为优势、林业工程为特色的多学科协调发展的高等学校，地处我国最大国有林区的中心——哈尔滨市，校园占地136公顷，并拥有帽儿山实验林场（帽儿山森林公园）和凉水实验林场（凉水国家级自然保护区）等教学、科研、实习基地，总面积达3.3万公顷。
        </div>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<style scoped>
/* 全局字体和颜色设置 */
body {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* 头部样式 */
header {
  width: 83.06vw;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 90px; /* 替换为实际的logo宽度 */
  height: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 侧边栏样式 */
nav {
  width: 20vw; /* 侧边栏宽度为20% */
  height: 76vh; /* 侧边栏高度为100% */
  background-color: rgb(7, 121, 7);
  padding: 1rem;
  display: flex;
  flex-direction: column; /* 使列表垂直排列 */
}

nav ul {
  list-style-type: none;
  padding: 0;
  width: 100%; /* 确保列表宽度填满侧边栏 */
}

nav li {
  cursor: pointer;
  padding: 0.5rem 0;
  transition: background-color 0.3s;
  width: 100%; /* 确保列表项宽度填满侧边栏 */
}

nav li:hover {
  background-color: wheat;
}

/* 主内容区域样式 */
main {
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-container {
  display: flex;
  height: 79vh;
  width: 85vw;
}

/* 响应式设计 */
@media (max-width: 768px) {
  nav,
  main {
    width: 100%;
    height: 100%;
  }

  .main-container {
    flex-direction: column;
    height: auto;
  }

  header {
    flex-direction: column;
    align-items: center;
  }

  .user-info {
    margin-top: 1rem;
  }
}
</style>
