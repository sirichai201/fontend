<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-breadcrumbs :items="Admin"></v-breadcrumbs>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4">
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-start">
                                <div><b>Total Users</b></div>
                                <h1 style="font-size: 50px;">{{ totaluser }}</h1>
                            </v-col>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-center">
                                <v-icon style="font-size: 100px;" class="text-success">
                                    mdi-account
                                </v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-start">
                                <div><b>Total Bills</b></div>
                                <h1 style="font-size: 50px;">{{ totalbill }}</h1>
                            </v-col>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-center">
                                <v-icon style="font-size: 100px;" class="text-danger">
                                    mdi-cart-outline
                                </v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-start">
                                <div><b>Total Price Orders</b></div>
                                <h1 style="font-size: 50px;">{{ totalprice }}</h1>
                            </v-col>
                            <v-col cols="6" class="d-flex flex-column justify-center align-center text-center">
                                <v-icon style="font-size: 100px;" class="text-warning">
                                    mdi-currency-thb
                                </v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="7">
                <v-card style="height: 425px;" class="d-flex flex-column justify-center align-center text-center">
                    {{ user }}
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-row>
                    <v-col cols="12">
                        <v-card style="height: 200px;" class="d-flex flex-column justify-center align-center text-start">
                            <v-container class="px-10">
                                <h1 style="font-size: 50px;">{{ totalproduct }}</h1>
                                <div><b>Total Product</b></div>
                            </v-container>
                            <v-card-text class="text-end">
                                <v-btn text><v-icon>mdi-eye</v-icon></v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card style="height: 200px;" class="d-flex flex-column justify-center align-center text-start">
                            <v-container class="px-10">
                                <div><b>Recents User</b></div>
                                <h1 style="font-size: 50px;">0</h1>
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
                    <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
                </v-card>
            </v-col>
        </v-row>    
        <v-row>
            <v-col cols="6">
                <v-card style="height: 300px;" class="d-flex flex-column justify-center align-center text-center">
                    <v-container>
                        <!-- data here -->
                        <div>{{ order }}</div>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card style="height: 300px;" class="d-flex flex-column justify-center align-center text-center">
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
import axios from 'axios';
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
                { text: 'Order ID', value: 'order_id' },
                { text: 'User ID', value: 'user_id' },
                { text: 'Product ID', value: 'product_id' },
                { text: 'Quantity', value: 'quantity' },
                { text: 'Total Price', value: 'total_price' },
                { text: 'Member', value: 'Member' },
                { text: 'Created At', value: 'created_at' },
                { text: 'Payment', value: 'status' }
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
                const response = await axios.get('http://localhost:3000/api/user/user');
                this.user = response.data;
                this.totaluser = this.user.length;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchproduct() {
            try {
                const response = await axios.get('http://localhost:3000/api/Product/Product');
                this.product = response.data;
                this.totalproduct = this.product.length;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchOrder() {
            try {
                const response = await axios.get('http://localhost:3000/api/user/AllGetProductsAndOrders');
                this.order = response.data; // Adjusted for the correct path
                this.desserts = this.order.map(item => ({
                    order_id: item._id,
                    user_id: item.user_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    total_price: item.total_price,
                    Member: item.Member,
                    created_at: item.created_at,            
                    status: item.status == 0 ? "รอชำระ" : "ชำระแล้ว"
                    
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async fetchbill() {
            try {
                const response = await axios.get('http://localhost:3000/api/user/GetBill');
                this.bill = response.data;
                this.totalbill = response.data.length;
                let total = 0;
                for (let i = 0; i < this.bill.length; i++) {
                    total += parseInt(this.bill[i].total_price, 10); // Corrected total_price
                }
                this.totalprice = total;
            } catch (error) {
                console.error('Error fetching bills:', error);
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
