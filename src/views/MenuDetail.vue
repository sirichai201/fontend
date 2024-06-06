<template>
  <div>
    <v-container class="mb-8">
      <b-breadcrumb>
        <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
        <b-breadcrumb-item href="/menu">Menu</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ product.product_name }}</b-breadcrumb-item>
      </b-breadcrumb>
      <div class="d-flex justify-content-between flex-wrap align-start mb-4">
        <h3 class="mb-0">{{ product.product_type }}</h3>
        <a class="text-black text-decoration-none" @click="goBack">
          <v-icon>mdi-chevron-left</v-icon>Back
        </a>
      </div>
    </v-container>
    <div class="hero-bg-2">
      <v-container>
        <v-row class="mb-16">
          <v-col
            md="5"
            cols="12"
            class="d-flex justify-content-center align-center"
          >
            <v-img
              :src="
                product.image ||
                'https://cdn.vuetifyjs.com/images/cards/cooking.png'
              "
              class="rounded-main w-100"
            ></v-img>
            <!-- <v-img
              src="https://www.peets.com/cdn/shop/products/iced-matcha-green-tea-latte.png?v=1597269392"
              class="rounded-main w-100"
            ></v-img> -->
          </v-col>
          <v-col md="7" cols="12" class="d-flex align-center">
            <div class="card border-0 pa-6 card-detail w-100">
              <h1>{{ product.product_name }}</h1>
              <div class="d-flex align-center mb-5">
                <h3 class="mb-0 mr-4">{{ product.product_price }} ฿</h3>
                <span class="category py-2">{{ product.product_type }}</span>
              </div>
              <p>
                Discover the pure essence of traditional Japanese tea ceremonies
                with our Premium Matcha Green Tea. Made from the finest
                shade-grown tea leaves, carefully stone-ground into a vibrant
                green powder, this matcha offers a rich, smooth flavor with a
                hint of natural sweetness. Packed with antioxidants, vitamins,
                and minerals, our matcha provides a natural energy boost and
                promotes overall well-being. Perfect for sipping as a hot tea,
                enjoying as a refreshing iced drink, or adding to your favorite
                recipes for a healthy twist. Experience the authentic taste and
                health benefits of high-quality matcha with every cup.
              </p>
              <p>{{ product.description || "No description available." }}</p>
              <div class="mt-16">
                <button
                  @click="addToCart(product)"
                  class="btn btn-outline-success mr-4 px-lg-12"
                >
                  BUY NOW!
                </button>
                <button class="btn btn-outline-danger px-lg-12">
                  Add to Favorite
                </button>
              </div>
            </div>
          </v-col>

          <v-col cols="12" class="mt-8">
            <v-tabs v-model="model" slider-color="yellow">
              <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">
                Item {{ i }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="model">
              <v-tab-item v-for="i in 3" :key="i" :value="`tab-${i}`">
                <div class="card border-0 shadow-none mt-3 pa-6">
                  <div class="card-body p-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nulla, iusto. Ab officiis natus ea. Dolorum neque sequi
                    ipsum, at laboriosam provident minima voluptas porro saepe
                    voluptates nesciunt? Voluptatum, eos quo! Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Nulla, iusto. Ab
                    officiis natus ea. Dolorum neque sequi ipsum, at laboriosam
                    provident minima voluptas porro saepe voluptates nesciunt?
                    Voluptatum, eos quo! Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Nulla, iusto. Ab officiis natus ea.
                    Dolorum neque sequi ipsum, at laboriosam provident minima
                    voluptas porro saepe voluptates nesciunt? Voluptatum, eos
                    quo!
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>

        <h3 class="mb-6">You may also like</h3>
        <v-row class="mb-8">
          <product-card
            v-for="product in randomProducts"
            :key="product._id"
            :product="product"
            :loading="loading"
          ></product-card>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";
import { Menu } from "@/assets/data/Breadcrumb.js";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      items: Menu,
      product: {},
      products: [],
      model: null,
      loading: true,
    };
  },
  created() {
    this.fetchProductDetails();
    this.fetchProducts();
  },
  methods: {
    async fetchProductDetails() {
      const productId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/user/GetProductByID/${productId}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/Product/Product"
        ); // Change this to your actual API endpoint
        this.products = response.data;
        this.randomProducts = this.getRandomProducts(this.products, 3);
        this.loading = false;
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        this.loading = false;
      }
    },
    getRandomProducts(products, count) {
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    goBack() {
      this.$router.go(-1);
    },
    addToCart(product) {
      // Implement add to cart functionality here
      console.log("Add to cart:", product);
    },
  },
  computed: {
    relatedProducts() {
      return this.products
        .filter(
          (p) =>
            p.product_type === this.product.product_type &&
            p._id !== this.product._id
        )
        .slice(0, 3);
    },
  },
};
</script>

<style>
.theme--light.v-tabs > .v-tabs-bar,
.theme--light.v-tabs-items {
  background-color: transparent !important;
}

.v-window {
  height: auto !important;
}
</style>
