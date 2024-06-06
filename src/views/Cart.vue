<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <div class="d-flex flex-wrap align-center justify-content-between mb-4">
      <h1>Cart</h1>
      <a class="d-flex align-start text-black text-decoration-none" href="/">
        <v-icon>mdi-chevron-left</v-icon>Back
      </a>
    </div>

    <div v-if="cartItems.length === 0" class="py-16 border rounded-main text-center mb-8">
        <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp" width="250" alt="">
        <h5>Looks like you have no any foods.</h5>
        <a class="btn btn-outline-success mt-3" href="/menu">Go shopping</a>
      </div>
    <v-row v-else class="mb-8 mt-4">
      <v-col lg="8" md="12" sm="12" cols="12">
        <v-row v-for="(product, index) in cartItems" :key="index" class="mb-4">
          <v-col lg="3" md="3" sm="3" cols="3">
            <v-img :src="product.img" class="img-cart"></v-img>
          </v-col>
          <v-col lg="9" md="9" sm="9" cols="9">
            <div class="d-flex justify-content-between flex-wrap">
              <p class="mb-1 text-secondary">PID : {{ product.pid }}</p>
              <p class="mb-1 text-secondary">Price</p>
            </div>
            <div class="d-flex justify-content-between flex-wrap">
              <h3 class="mb-1 w-75">{{ product.name }}</h3>
              <h3 class="mb-1">{{ product.price }} ฿</h3>
            </div>
            <p class="mb-1 text-secondary">+ {{ product.point }} Points</p>
            <div class="d-flex justify-content-between align-center flex-wrap">
              <v-btn-toggle v-model="toggle_exclusive" rounded class="mt-4">
                <v-btn @click="decreaseQuantity(index)"> - </v-btn>
                <v-btn disabled>{{ product.quantity }}</v-btn>
                <v-btn @click="increaseQuantity(index)"> + </v-btn>
              </v-btn-toggle>
              <a
                @click.prevent="deleteItem(index)"
                class="text-decoration-none"
              >
                <i class="fa-regular fa-trash-can fa-xl text-secondary"></i>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="4" md="12" sm="12" cols="12" class="pl-lg-8">
        <div class="card border-0">
          <div class="card-header bg-white px-5 py-4">
            <h3 class="mb-0">Summary</h3>
          </div>
          <div class="card-footer bg-white px-5 py-4">
            <table class="table table-borderless">
              <tbody>
                <tr v-for="(summaryItem, index) in cartItems" :key="index">
                  <td class="p-0">{{ summaryItem.name }}</td>
                  <td class="p-0">
                    <div class="text-right mb-3">
                      <p class="mb-0">
                        {{ summaryItem.price * summaryItem.quantity }} ฿
                      </p>
                      <small class="text-secondary"
                        >+
                        {{
                          summaryItem.point * summaryItem.quantity
                        }}
                        Point</small
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table table-borderless mt-10 mb-0">
              <tbody>
                <tr>
                  <td class="p-0 h6 font-weight-bolder">Total</td>
                  <td class="p-0">
                    <div class="text-right mb-3">
                      <h6 class="mb-0 font-weight-bolder">
                        {{ totalPrice }} ฿
                      </h6>
                      <h6 class="mb-0 font-weight-bolder">
                        {{ totalPoints }} Points
                      </h6>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center mb-2">
              <button class="btn btn-success px-lg-16 w-100">Check out</button>
            </div>
          </div>
        </div>
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
</template>

<script>
import { Carts } from "@/assets/data/Breadcrumb.js";
import { Cart } from "@/assets/data/MockData.js";
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      breadcrumbs: Carts,
      cartItems: Cart.map((item) => ({ ...item, quantity: 1 })),
      products: [],
      randomProducts: [],
      loading: true,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      );
    },
    totalPoints() {
      return this.cartItems.reduce(
        (total, item) => total + parseFloat(item.point) * item.quantity,
        0
      );
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://127.0.0.1:3000/api/Product/Product") // Change this to your actual API endpoint
        .then((response) => {
          this.products = response.data;
          this.randomProducts = this.getRandomProducts(this.products, 3);
          this.loading = false;
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
          this.loading = false;
        });
    },
    getRandomProducts(products, count) {
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    deleteItem(index) {
      this.cartItems.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
