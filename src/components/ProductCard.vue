<template>
    <v-col
      lg="4"
      md="4"
      sm="12"
      cols="12"
    >
      <v-card :loading="loading" class="mx-auto bg-white">
        <v-img :src="product.image" height="250"></v-img>
        <div class="p-2">
          <v-card-title
            class="d-flex justify-content-between flex-wrap align-items-center pb-0"
          >
            <h5 class="mb-0">{{ product.product_name }}</h5>
            <span class="category">{{ product.product_type }}</span>
          </v-card-title>
  
          <v-card-text>
            <h1 class="d-block text-dark">{{ product.product_price }} ฿</h1>
            <div class="my-5">{{ product.description || 'No description available.' }}</div>
          </v-card-text>
  
          <v-card-actions class="d-flex justify-content-center">
            <button class="btn btn-outline-success px-lg-16 mb-5">
              Add to cart
            </button>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for your component here */
  </style>
  