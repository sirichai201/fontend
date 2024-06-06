<template>
  <v-container>
    <v-breadcrumbs :items="Product"></v-breadcrumbs>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <v-btn color="success" @click="showAddDialog = true">Add Product</v-btn>
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
          <v-btn icon color="primary" @click="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>&nbsp;
          <v-btn icon color="error" @click="deleteItem(item)"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add Product Dialog -->
    <v-dialog v-model="showAddDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="addForm">
            <v-text-field v-model="newProduct.product_name" label="Name"></v-text-field>
            <v-text-field v-model="newProduct.product_price" label="Price"></v-text-field>
            <v-text-field v-model="newProduct.product_point" label="Point"></v-text-field>
            <v-text-field v-model="newProduct.product_type" label="Type"></v-text-field>
            <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
            <v-text-field v-model="newProduct.image" label="ImageURL"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddDialog = false">Cancel</v-btn>
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
            <v-text-field v-model="currentProduct.product_name" label="Name"></v-text-field>
            <v-text-field v-model="currentProduct.product_price" label="Price"></v-text-field>
            <v-text-field v-model="currentProduct.product_point" label="Point"></v-text-field>
            <v-text-field v-model="currentProduct.product_type" label="Type"></v-text-field>
            <v-text-field v-model="currentProduct.description" label="Description"></v-text-field>
            <v-text-field v-model="currentProduct.image" label="ImageURL"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showEditDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="updateProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Product Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this product?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Name', value: 'product_name' },
        { text: 'Price', value: 'product_price' },
        { text: 'Point', value: 'product_point' },
        { text: 'Type', value: 'product_type' },
        { text: 'Description', value: 'description' },
        { text: 'Image', value: 'image' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      newProduct: {
        product_name: '',
        product_price: 0,
        product_point: 0,
        product_type: '',
        description: '',
        image: '',
      },
      currentProduct: {},
    };
  },
  methods: {
    async fetchProducts() {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/Product/Product');
    this.desserts = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
},
    async addProduct() {
  try {
    const payload = {
      product_name: this.newProduct.product_name,
      product_price: this.newProduct.product_price,
      product_point: this.newProduct.product_point,
      product_type: this.newProduct.product_type,
      description: this.newProduct.description,
      image: this.newProduct.image,
    };
    const response = await axios.post(
      "http://127.0.0.1:3000/api/Product/PostProduct",
      payload
    );
    console.log('Product added successfully:', response.data);
    this.fetchProducts(); // Fetch the updated list of products
  } catch (error) {
    console.error("Error adding product:", error.response.data);
  }
  this.showAddDialog = false;
},
    editItem(item) {
      this.currentProduct = { ...item };
      this.showEditDialog = true;
    },
    async updateProduct() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/products/${this.currentProduct._id}`,
          this.currentProduct
        );
        console.log('Product updated successfully:', response.data);
        this.fetchProducts(); // Fetch the updated list of products
      } catch (error) {
        console.error("Error updating product:", error.response.data);
      }
      this.showEditDialog = false;
    },
    deleteItem(item) {
      this.currentProduct = { ...item };
      this.showDeleteDialog = true;
    },
    async confirmDelete() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/products/${this.currentProduct._id}`
        );
        console.log('Product deleted successfully:', response.data);
        this.fetchProducts(); // Fetch the updated list of products
      } catch (error) {
        console.error("Error deleting product:", error.response.data);
      }
      this.showDeleteDialog = false;
    },
  },
  created() {
    this.fetchProducts();
  }
};
</script>


<style>
/* Add your custom styles here if needed */
</style>
