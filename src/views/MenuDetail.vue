<template>
    <div>
      <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <div class="d-flex justify-content-between align-end mb-4">
          <h1>Product Details</h1>
          <a class="d-flex align-start text-black text-decoration-none" href="/">
            <v-icon>mdi-chevron-left</v-icon>Back</a>
        </div>
      </v-container>
  
      <v-container>
        <v-card class="mx-auto bg-white">
          <v-img
            height="400"
            :src="product.image || 'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
          ></v-img>
          <div class="p-4">
            <v-card-title class="d-flex justify-content-between flex-wrap align-items-center pb-0">
              <h2 class="mb-0">{{ product.product_name }}</h2>
              <span class="category">{{ product.product_type }}</span>
            </v-card-title>
  
            <v-card-text>
              <h1 class="d-block text-dark">{{ product.product_price }} ฿</h1>
              <div class="my-5">{{ product.description || 'No description available.' }}</div>
            </v-card-text>
  
            <v-card-actions class="d-flex justify-content-center">
              <button class="btn btn-outline-success px-16 mb-5">
                Add to cart
              </button>
            </v-card-actions>
          </div>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Menu } from "@/assets/data/Breadcrumb.js";
  
  export default {
    data() {
      return {
        breadcrumbs: Menu,
        product: {},
      };
    },
    created() {
      this.fetchProductDetails();
    },
    methods: {
      async fetchProductDetails() {
        const productId = this.$route.params.id; // Get the product ID from the URL
        try {
          const response = await axios.get(`http://127.0.0.1:3000/api/Product/Product/${productId}`);
          this.product = response.data;
          this.breadcrumbs.push({ text: this.product.product_name, active: true });
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  