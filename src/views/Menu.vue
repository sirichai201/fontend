<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <div class="d-flex justify-content-between align-end mb-4">
        <h1>Our Menu</h1>
        <a class="d-flex align-start text-black text-decoration-none" href="/">
          <v-icon>mdi-chevron-left</v-icon>Back</a>
      </div>
    </v-container>

    <img :src="randomImage" class="random-img" />

    <v-container>
      <v-sheet elevation="10" class="py-4 px-1 bg-transparent shadow-none">
        <v-chip-group multiple active-class="primary--text">
          <v-chip
            v-for="type in uniqueProductTypes"
            :key="type"
            class="bg-success"
            @click="selectType(type)"
            :class="{ 'bg-primary': selectedType === type }"
          >
            {{ type }}
          </v-chip>
        </v-chip-group>
      </v-sheet>

      <v-row>
        <v-col
          lg="4"
          md="4"
          sm="6"
          cols="6"
          v-for="product in paginatedProducts"
          :key="product._id"
        >
        <a :href="`/menu/${product._id}`" class="text-decoration-none">
          <v-card class="mx-auto bg-white"  >
            
            <v-img
              height="250"
              :src="product.image || 'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
            ></v-img>
            <div class="p-2">
              <v-card-title
                class="d-flex justify-content-between flex-wrap align-items-center pb-0"
              >
                <h5 class="mb-0">{{ product.product_name }}</h5>
                <span class="category">{{ product.product_type }}</span>
              </v-card-title>

              <v-card-text>
                <h1 class="d-block text-dark">{{ product.product_price }} ฿</h1>
                <div class="my-5">
                  {{ product.description || 'No description available.' }}
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-content-center">
                <button class="btn btn-outline-success px-lg-16 mb-5">
                  Add to cart
                </button>
              </v-card-actions>
            </div>
          </v-card>
        </a>
        </v-col>
      </v-row>

      <div class="text-center mt-8 mb-10">
        <v-pagination v-model="page" :length="pageCount" color="red"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { Menu } from "@/assets/data/Breadcrumb.js";
import { Food } from "@/assets/data/Random.js";

export default {
  data() {
    return {
      items: Menu,
      randomImage: "",
      products: [],
      page: 1,
      itemsPerPage: 6,
      selectedType: '',
    };
  },
  created() {
    this.randomImage = this.getRandomImage();
    this.fetchProducts();
  },
  computed: {
    uniqueProductTypes() {
      const types = this.products.map(product => product.product_type);
      return [...new Set(types)];
    },
    filteredProducts() {
      if (this.selectedType) {
        return this.products.filter(product => product.product_type === this.selectedType);
      }
      return this.products;
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    getRandomImage() {
      const randomIndex = Math.floor(Math.random() * Food.length);
      return Food[randomIndex].src;
    },



    goToProductDetail(productId) {
    this.$router.push({ name: 'MenuDetail', params: { id: productId } });
},
    async fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/Product/Product');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectType(type) {
      if (this.selectedType === type) {
        this.selectedType = '';
      } else {
        this.selectedType = type;
      }
      this.page = 1;
    },
  },
};
</script>

<style scoped>
</style>
