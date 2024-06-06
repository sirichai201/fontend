<template>
  <footer class="bg-white">
    <v-container>
      <div class="d-flex justify-content-between flex-wrap mt-5">
        <ul>
          <h5 class="mb-3">Our Menu</h5>
          <li class="nav-link"><a href="">Foods</a></li>
          <li class="nav-link"><a href="">Drinks</a></li>
          <li class="nav-link"><a href="">Appetizers</a></li>
          <li class="nav-link"><a href="">Desserts</a></li>
          <li class="nav-link"><a href="">Main Courses</a></li>
        </ul>
        <ul>
          <h5 class="mb-3">Customer Service</h5>
          <li class="nav-link"><a href="">Contact Us</a></li>
          <li class="nav-link"><a href="">Order Tracking</a></li>
          <li class="nav-link"><a href="">Shipping & Delivery</a></li>
          <li class="nav-link"><a href="">Returns & Refunds</a></li>
          <li class="nav-link"><a href="">FAQs</a></li>
        </ul>
        <ul>
          <h5 class="mb-3">About Us</h5>
          <li class="nav-link"><a href="">Our Story</a></li>
          <li class="nav-link"><a href="">Careers</a></li>
          <li class="nav-link"><a href="">Sustainability</a></li>
          <li class="nav-link"><a href="">Press</a></li>
        </ul>
        <ul>
          <h5 class="mb-3">Recipes & Tips</h5>
          <li class="nav-link"><a href="">Featured Recipes</a></li>
          <li class="nav-link"><a href="">Cooking Tips</a></li>
          <li class="nav-link"><a href="">Food Facts</a></li>
          <li class="nav-link"><a href="">Blog</a></li>
        </ul>
        <ul>
          <h5 class="mb-3">Connect</h5>
          <li class="nav-link"><a href="">Facebook</a></li>
          <li class="nav-link"><a href="">Instagram</a></li>
          <li class="nav-link"><a href="">Twitter</a></li>
          <li class="nav-link"><a href="">Pinterest</a></li>
          <li class="nav-link"><a href="">YouTube</a></li>
        </ul>
      </div>
      <v-row class="text-center mt-5">
        <v-col cols="12">
          <a href="" class="px-1"><v-icon>mdi-facebook</v-icon></a>
          <a href="" class="px-1"><v-icon>mdi-instagram</v-icon></a>
          <a href="" class="px-1"><v-icon>mdi-twitter</v-icon></a>
          <a href="" class="px-1"><v-icon>mdi-pinterest</v-icon></a>
          <a href="" class="px-1"><v-icon>mdi-youtube</v-icon></a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <small class="d-flex justify-content-center text-secondary mb-1">
        Copyright © 2024 CaféShop. All Rights Reserved
      </small>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped></style>