<template>
  <div>
    <Navbar />
    <div class="img-container">
      <img class="img" src="https://media.tenor.com/r_UXzJS2a8gAAAAM/hello-fuckwits.gif"  />
    
    </div>
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
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px); /* Adjust height if needed, 120px is just an example for Navbar and Footer height */
}

.img {
  max-width: 100%;
  height: auto;
   display: flex;
  justify-content: center;
  align-items: center;
}
</style>
