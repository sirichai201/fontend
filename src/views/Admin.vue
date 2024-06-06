<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="Admin"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="12">
        <div class="card border-0 pa-8">
          <div class="d-flex justify-content-between align-center">
            <div>
              <b>Total Users</b>
              <h1 class="heading-1">{{ totaluser }}</h1>
            </div>
            <i class="fa-solid fa-user fa-2xl text-success"></i>
          </div>
        </div>
      </v-col>
      <v-col md="4" cols="12">
        <div class="card border-0 pa-8">
          <div class="d-flex justify-content-between align-center">
            <div>
              <b>Total Bills</b>
              <h1 class="heading-1">{{ totalbill }}</h1>
            </div>
            <i class="fa-solid fa-2xl fa-cart-shopping text-danger"></i>
          </div>
        </div>
      </v-col>
      <v-col md="4" cols="12">
        <div class="card border-0 pa-8">
          <div class="d-flex justify-content-between align-center">
            <div>
              <b>Total Price Orders</b>
              <h1 class="heading-1">{{ totalprice }}</h1>
            </div>
            <i class="fa-solid fa-2xl fa-sack-dollar text-warning"></i>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Apex chart -->
    <v-row>
      <v-col lg="7" cols="12">
        
      </v-col>
      <v-col lg="5" cols="12">
        <v-row>
          <v-col cols="12">
            <v-card
              style="height: 200px"
              class="d-flex flex-column justify-center align-center text-start"
            >
              <v-container class="px-10">
                <h1>{{ totalproduct }}</h1>
                <div><b>Total Product</b></div>
              </v-container>
              <v-card-text class="text-end">
                <v-btn text><v-icon>mdi-eye</v-icon></v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card
              style="height: 200px"
              class="d-flex flex-column justify-center align-center text-start"
            >
              <v-container class="px-10">
                <div><b>Recents User</b></div>
                <h1>0</h1>
              </v-container>
              <v-card-text class="text-end">
                <v-btn text><v-icon>mdi-eye</v-icon></v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          style="height: 300px"
          class="d-flex flex-column justify-center align-center text-center"
        >
          <v-container>
            <!-- data here -->
            <div>{{ order }}</div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          style="height: 300px"
          class="d-flex flex-column justify-center align-center text-center"
        >
          <v-container>
            <!-- data here -->
            <!-- <div>{{ product }}</div> -->
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { Admin } from "@/assets/data/Breadcrumb.js";

export default {
  data() {
    return {
      Admin: Admin,
      user: [],
      bill: [],
      product: [],
      order: [],
      totaluser: 0,
      totalbill: 0,
      totalprice: 0,
      totalproduct: 0,
      desserts: [],
      headers: [
        { text: "Order ID", value: "order_id" },
        { text: "User ID", value: "user_id" },
        { text: "Product ID", value: "product_id" },
        { text: "Quantity", value: "quantity" },
        { text: "Total Price", value: "total_price" },
        { text: "Member", value: "Member" },
        { text: "Created At", value: "created_at" },
        { text: "Payment", value: "status" },
      ],
    };
  },
  created() {
    this.randomImage = this.getRandomImage();
    this.fetchuser();
    this.fetchbill();
    this.fetchproduct();
    this.fetchOrder(); // Corrected fetchOrder method name
  },
  methods: {
    async fetchuser() {
      try {
        const response = await axios.get("http://localhost:3000/api/user/user");
        this.user = response.data;
        this.totaluser = this.user.length;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchproduct() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Product/Product"
        );
        this.product = response.data;
        this.totalproduct = this.product.length;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchOrder() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/AllGetProductsAndOrders"
        );
        this.order = response.data; // Adjusted for the correct path
        this.desserts = this.order.map((item) => ({
          order_id: item._id,
          user_id: item.user_id,
          product_id: item.product_id,
          quantity: item.quantity,
          total_price: item.total_price,
          Member: item.Member,
          created_at: item.created_at,
          status: item.status == 0 ? "รอชำระ" : "ชำระแล้ว",
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchbill() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/GetBill"
        );
        this.bill = response.data;
        this.totalbill = response.data.length;
        let total = 0;
        for (let i = 0; i < this.bill.length; i++) {
          total += parseInt(this.bill[i].total_price, 10); // Corrected total_price
        }
        this.totalprice = total;
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    },
    getRandomImage() {
      const randomImages = [
        "https://random.imagecdn.app/500/150",
        "https://source.unsplash.com/random/500x150",
        "https://loremflickr.com/500/150",
        "https://placekitten.com/500/150",
      ];
      return randomImages[Math.floor(Math.random() * randomImages.length)];
    },
  },
};
</script>

<style scoped>
/* Styles */
</style>
