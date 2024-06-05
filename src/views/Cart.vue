<template>
    <v-container>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <div class="d-flex flex-wrap align-center justify-content-between mb-4">
            <h1>Cart</h1>
            <a class="d-flex align-start text-black text-decoration-none" href="/">
                <v-icon>mdi-chevron-left</v-icon>Back
            </a>
        </div>

        <v-row class="mb-10">
            <v-col lg="8" md="7" sm="12" cols="12">
                <v-row v-for="(product, index) in cartItems" :key="index">
                    <v-col lg="3" md="4" sm="5" cols="5">
                        <v-img :src="product.img" class="img-cart rounded-main"></v-img>
                    </v-col>
                    <v-col lg="9" md="8" sm="7" cols="7">
                        <div class="d-flex justify-content-between flex-wrap">
                            <p class="mb-1 text-secondary">PID : 0123456789</p>
                            <p class="mb-1 text-secondary">Price</p>
                        </div>
                        <div class="d-flex justify-content-between flex-wrap">
                            <h3 class="mb-1">{{ product.name }}</h3>
                            <h3 class="mb-1">{{ product.price }} ฿</h3>
                        </div>
                        <p class="mb-1 text-secondary"> + {{ product.point }} Points</p>
                    </v-col>
                </v-row>
            </v-col>
            <v-col lg="4" md="12" sm="12" cols="12">
                <div class="card">
                    <div class="card-header bg-white">
                        <h3>Summary</h3>
                    </div>
                    <div class="card-footer bg-white">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>Matcha Green Tea</td>
                                    <td>
                                        <div class="text-right">
                                            <p class="mb-0">60 ฿</p>
                                            <small class="text-secondary">+ 20 Point</small>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Matcha Green Tea</td>
                                    <td>
                                        <div class="text-right">
                                            <p class="mb-0">60 ฿</p>
                                            <small class="text-secondary">+ 20 Point</small>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Carts } from "@/assets/data/Breadcrumb.js";
import { Cart } from "@/assets/data/MockData.js";

export default {
    data() {
        return {
            breadcrumbs: Carts,
            cartItems: Cart,
        };
    },
};
</script>

<style></style>