<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <div class="d-flex justify-content-between align-end mb-4">
        <h1>Our Menu</h1>
        <a class="d-flex align-start text-black text-decoration-none" href="/">
          <v-icon>mdi-chevron-left</v-icon>Back</a
        >
      </div>
    </v-container>

    <v-img :src="randomImage" class="random-img"></v-img>

    <v-container>
      <v-sheet elevation="10" class="py-4 px-1 bg-transparent shadow-none">
        <v-chip-group multiple active-class="primary--text">
          <v-chip v-for="tag in FoodCategory" :key="tag" class="bg-success">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>

      <v-row>
        <v-col lg="4" md="4" sm="12" cols="12" v-for="(item, i) in 12" :key="i">
          <v-card :loading="loading" class="mx-auto bg-white">
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <div class="p-2">
              <v-card-title
                class="d-flex justify-content-between flex-wrap align-items-center pb-0"
              >
                <h5 class="mb-0">Cafe Badilico</h5>
                <span class="category">Drinks</span>
              </v-card-title>

              <v-card-text>
                <h1 class="d-block text-dark">60 ฿</h1>
                <div class="my-5">
                  Discover the pure essence of traditional Japanese tea
                  ceremonies with our Premium Matcha Green Tea.
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-content-center">
                <button class="btn btn-outline-success px-16 mb-5">
                  Add to cart
                </button>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-8 mb-10">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import { Menu } from "@/assets/data/Breadcrumb.js";
import { Food } from "@/assets/data/Random.js";
import { FoodCategory } from "@/assets/data/MockData.js";

export default {
  data() {
    return {
      items: Menu,
      FoodCategory,
      randomImage: "",
    };
  },
  created() {
    this.randomImage = this.getRandomImage();
  },
  methods: {
    getRandomImage() {
      const randomIndex = Math.floor(Math.random() * Food.length);
      return Food[randomIndex].src;
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
