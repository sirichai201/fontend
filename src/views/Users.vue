<template>
    <v-container>
      <v-breadcrumbs :items="Users"></v-breadcrumbs>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="6">
              <v-btn color="success" @click="showAddDialog = true"
                >Add Product</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          item-value="product_id"
        >
        <template slot="item.action" slot-scope="{ item }">
            <v-btn icon color="primary" @click="editItem(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >&nbsp;
            <v-btn icon color="error" @click="deleteItem(item)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-card>
      <v-dialog v-model="showAddDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Product</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="addForm">
          <v-text-field
            v-model="newProduct.product_name"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.product_price"
            label="Price"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.product_point"
            label="Point"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.product_type"
            label="Type"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.description"
            label="Description"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.image"
            label="ImageURL"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showAddDialog = false"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click="addProduct">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
      <!-- Edit Product Dialog -->
      <v-dialog v-model="showEditDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Product</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="editForm">
              <v-text-field
                v-model="currentProduct.product_name"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.product_price"
                label="Price"
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.product_point"
                label="Point"
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.description"
                label="Description"
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.image"
                label="ImageURL"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showEditDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="updateProduct">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Delete Product Dialog -->
      <v-dialog v-model="showDeleteDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete this product?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showDeleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="confirmDelete"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  import { Users } from "@/assets/data/Breadcrumb.js";
  
  export default {
    data() {
      return {
        Users: Users,
        product: [],
        desserts: [],
        search: "",
        headers: [
          { text: "No", value: "product_id" },
          { text: "Name", value: "product_name" },
          { text: "Price ($)", value: "product_price" },
          { text: "Point", value: "product_point" },
          { text: "Description", value: "description" },
          { text: "Action", value: "action", sortable: false },
        ],
        showAddDialog: false,
        showEditDialog: false,
        showDeleteDialog: false,
        newProduct: {
          product_name: "",
          product_price: "",
          product_point: "",
          product_type: "",
          description: "",
          image: "",
        },
        currentProduct: {},
        productToDelete: null,
      };
    },
    created() {
      this.fetchproducts();
    },
    methods: {
      async fetchproducts() {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/Product/Product"
          );
          this.product = response.data;
          this.desserts = this.product.map((item, index) => ({
            _id: item._id,
            product_id: index + 1,
            product_name: item.product_name,
            product_price: item.product_price,
            product_point: item.product_points,
            description: item.description,
            image: item.image
          }));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      async addProduct() {
  try {
    await axios.post(
      "http://localhost:3000/api/user/PostProduct",
      {
        product_name: this.newProduct.product_name,
        product_price: this.newProduct.product_price,
        product_point: this.newProduct.product_point,
        product_type: this.newProduct.product_type,
        description: this.newProduct.description,
        image: this.newProduct.image,
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
  }
  this.showAddDialog = false;
}
,
      editItem(item) {
        this.currentProduct = { ...item };
        this.showEditDialog = true;
      },
      async updateProduct() {
        try {
          await axios.put(
            `http://localhost:3000/api/user/updateUser/${this.currentProduct._id}`,
            {
              product_name: this.currentProduct.product_name,
              product_price: this.currentProduct.product_price,
              product_point: this.currentProduct.product_point,
              description: this.currentProduct.description,
            }
          );
          const index = this.product.findIndex(
            (p) => p._id === this.currentProduct._id
          );
          if (index !== -1) {
            this.product[index].product_name = this.currentProduct.product_name;
            this.product[index].product_price = this.currentProduct.product_price;
            this.product[index].product_point = this.currentProduct.product_point;
            this.product[index].description = this.currentProduct.description;
  
            const dessertIndex = this.desserts.findIndex(
              (p) => p._id === this.currentProduct._id
            );
            if (dessertIndex !== -1) {
              this.desserts[dessertIndex].product_name =
                this.currentProduct.product_name;
              this.desserts[dessertIndex].product_price =
                this.currentProduct.product_price;
              this.desserts[dessertIndex].product_point =
                this.currentProduct.product_point;
              this.desserts[dessertIndex].description =
                this.currentProduct.description;
            }
          }
          alert("Changes saved successfully!");
        } catch (error) {
          console.error("There was an error saving the changes!", error);
        }
        this.showEditDialog = false;
      },
      deleteItem() {
        this.product = this.product.filter(
          (p) => p.product_id !== this.productToDelete.product_id
        );
        this.desserts = this.desserts.filter(
          (p) => p.product_id !== this.productToDelete.product_id
        ); // Update desserts array as well
        this.showDeleteDialog = false;
      },
      confirmDelete() {
        this.deleteItem();
      },
    },
  };
  
  </script>
  
  <style>
  /* Add your custom styles here if needed */
  </style>
  