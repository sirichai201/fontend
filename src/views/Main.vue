<template>
  <div>
    <Navbar :user="user" @logout="handleLogout" />
      <!-- <router-view /> -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    handleLoginSuccess(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    handleLogout() {
      this.user = null;
      localStorage.removeItem('user');
      // this.$router.push('/login');
    }
  },
};
</script>

<style scoped>

</style>
