<template>
    <v-bottom-navigation style="height: 500px;">
            <div class="container">
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <h4 class="mb-3">Our Services</h4>
                        <p>efin StockPickUp</p>
                        <p>efin Mobile</p>
                        <p>efin Trade Plus</p>
                        <p>efin Anywhere</p>
                        <p>Try our products</p>
                    </v-col>
                    <v-col cols="3">
                        <h4 class="mb-3">For Securities Company</h4>
                        <p>efin for Business</p>
                        <p>Services for Securities company </p>
                        <p>Securities company with efin</p>
                    </v-col>
                    <v-col cols="3" >
                        <h4 class="mb-3">About us</h4>
                        <p>About us</p>
                        <p>Activities</p>
                        <p>User Agreement</p>
                        <p>Data Privacy Policy</p>
                        <p>Cookies Policy</p>
                        <p>Contact us</p>
                    </v-col>
                    <v-col cols="2">
                        <h4 class="mb-3">News</h4>
                        <p>Investment</p>
                        <p>Announcements</p>
                        <p>Blogs</p>
                        <p>FAQs</p>
                    </v-col>
                    <v-col cols="2">
                        <h4 class="mb-3">More</h4>
                        <p>Contact us</p>
                        <p>Manage your ID</p>
                        <p>Support</p>
                        <p>Fees</p>
                        <p>APIs</p>
                        <p>Trading Rules</p>
                    </v-col>
                </v-row>
                <v-row class="text-center">
                    <v-col cols="12">
                        <a href="" class="px-1"><v-icon>mdi-facebook</v-icon></a>
                        <a href="" class="px-1"><v-icon>mdi-linkedin</v-icon></a>
                        <a href="" class="px-1"><v-icon>mdi-twitter</v-icon></a>
                    </v-col>
                </v-row>
                   
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row class="text-center">
                    <v-col cols="12" style="font-size: 12px; color:gray">
                        Copyright © 2024 Online Asset Company Limited. All Rights Reserved
                    </v-col>
                </v-row>
            </v-card-text>
        </div>
    </v-bottom-navigation>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>

.v-card-text {
  width: 100%;   
  text-align: center;
}
</style>
