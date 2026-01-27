<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="公司Logo">
    </div>
    <ul class="nav-menu">
      <li v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }" @click="handleMenuClick(index)">
        {{ item }}
      </li>
    </ul>
    <div class="user-info">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuItems: ['首页'],
      activeIndex: 0
    }
  },
  methods: {
    handleMenuClick(index) {
      this.activeIndex = index
      this.$emit('menu-change', this.menuItems[index])
      if (index === 0 && this.$route.path !== '/header') {
        this.$router.push('/header')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 5%;
}

.logo img {
  width: 120px;
  height: 40px;
}

.company-name {
  font-size: 20px;
  font-weight: bold;
  color: #1976d2;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
  width: 80%;
}

.nav-menu li {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  color: #424242;
  font-size: 15px;
}

.nav-menu li:hover {
  background-color: #90caf9;
  color: white;
}

.nav-menu li.active {
  background-color: #42a5f5;
  color: white;
}

.user-info {
  color: #424242;
  font-size: 14px;
}

</style>
