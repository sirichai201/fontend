<template>
  <div>
    <Navbar />
      <!-- View -->
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
  }
};
</script>

<style scoped>

</style>
