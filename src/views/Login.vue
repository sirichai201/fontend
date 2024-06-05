<template>
  <div class="login-bg">
  <v-container class="min-vh-100 d-flex justify-content-center align-center">
    <v-card style="width: 400px" class="pa-6">
      <v-col cols="12" class="px-0 pt-0">
        <a class="d-flex align-start text-black text-decoration-none" href="/">
          <v-icon>mdi-chevron-left</v-icon>Back
        </a>
      </v-col>
      <v-col cols="12" class="text-center mb-4">
        <h1 class="text-primary font-weight-bold mb-0">CafeShop</h1>
        <p>Welcome back!</p>
      </v-col>
      <form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <input
              v-model="username"
              class="form-control"
              type="text"
              id="username"
              placeholder="Username"
              :minlength="3"
              :maxlength="32"
              required
            />
          </v-col>
          <v-col cols="12">
            <input
              v-model="password"
              class="form-control"
              type="password"
              id="password"
              placeholder="Password"
              :minlength="3"
              :maxlength="32"
              required
            />
          </v-col>
        </v-row>
        <div class="text-right mt-2 mb-10">
          <a href="" class="text-dark text-decoration-none"
            >Forget password ?</a
          >
        </div>
        <div class="text-center mb-16">
          <button type="submit" class="btn btn-primary px-16">Login</button>
        </div>
        <div class="text-center">
          No account ? Sign up <a href="/register" class="text-primary">here</a>
        </div>
        <p v-if="loginMessage" class="login-message">{{ loginMessage }}</p>
      </form>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      loginMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/login",
          {
            username: this.username,
            password: this.password,
          }
        );
        this.loginMessage = `Login successful: ${response.data}`;
        this.$router.push("/");
      } catch (error) {
        if (error.response && error.response.data) {
          this.loginMessage = `Login failed: ${error.response.data}`;
        } else {
          this.loginMessage = "Login failed: An error occurred";
        }
      }
    },
  },
};
</script>

<style scoped></style>
