<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-white shadow-sm py-4">
        <div class="container-fluid">
          <a class="navbar-brand text-primary font-weight-bold" href="/">CafeShop</a>
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
                <a href="/admin/dashboard" class="nav-link">Home</a>
              </li>
              <li class="nav-item">
                <a href="/admin/dashboard" class="nav-link">Dashboard</a>
              </li>
              <li class="nav-item">
                <a href="/admin/products" class="nav-link">Product</a>
              </li>
              <li class="nav-item">
                <a href="/admin/users" class="nav-link">Users</a>
              </li>
              <li class="nav-item">
                <a href="/" class="nav-link">Orders</a>
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
                  <a href="" class="nav-link"><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
                </li>
                <li class="nav-item mr-2 mb-lg-0 mb-md-2 mb-sm-2 mb-2">
                  <!-- <a v-if="user" href="/profile" class="nav-link btn btn-outline-success">{{ user.username }}</a> -->
                  <div v-if="user" class="dropdown">
                    <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-user fa-lg mr-3"></i> {{ user.username }}
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item text-dark" href="#">Profile</a></li>
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
  export default {
    props: {
      user: {
        type: Object,
        default: null,
      },
    },
    methods: {
      logout() {
        this.$emit('logout');
      },
    },
  };
  </script>
  
  <style scoped></style>
  