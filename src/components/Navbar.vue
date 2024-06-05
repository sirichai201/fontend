<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm py-4">
      <div class="container-fluid">
        <a class="navbar-brand text-primary font-weight-bold" href="/">CaféShop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href="/" class="nav-link">Foods</a>
            </li>
            <li class="nav-item">
              <a href="/allweapon" class="nav-link">Drinks</a>
            </li>
            <li class="nav-item">
              <a href="/features" class="nav-link">Appetizers</a>
            </li>
            <li class="nav-item">
              <a href="/menu" class="nav-link">Menu</a>
            </li>
            <li class="nav-item">
              <a href="/allBundle" class="nav-link">About us</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item mr-2 mb-lg-0 mb-md-2 mb-sm-2 mb-2">
                <a @click.prevent="handleCartClick" class="nav-link"><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
              </li>
              <li class="nav-item mr-2 mb-lg-0 mb-md-2 mb-sm-2 mb-2">
                <!-- <a v-if="user" href="/profile" class="nav-link btn btn-outline-success">{{ user.username }}</a> -->
                <div v-if="user" class="dropdown">
                  <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user fa-lg mr-3"></i> {{ user.username }}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item text-dark" href="/userprofile">Profile</a></li>
                    <li><a class="dropdown-item text-dark" @click="logout">Sign out</a></li>
                  </ul>
                </div>
                <a v-else href="/login" class="nav-link btn btn-success">Sign in</a>
              </li>
              <li class="nav-item">
                <a v-if="!user" href="/register" class="nav-link btn btn-outline-success">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: ['user'],
  methods: {
    handleCartClick() {
      if (this.user) {
        this.$router.push('/cart');
      } else {
        this.$router.push('/login');
      }
    },
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout'
      }).then((result) => {
        if (result.isConfirmed) {
          // Remove user data from LocalStorage
          localStorage.removeItem('user');
          
          // Show success message
          Swal.fire(
            'Logged Out!',
            'You have been logged out successfully.',
            'success'
          ).then(() => {
            // Reload the page or redirect to login
            this.$router.push('/login');
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
