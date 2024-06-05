<template>
  <div class="login-bg">
    <v-container class="min-vh-100 d-flex justify-content-center align-center">
      <v-card style="width: 800px" class="pa-4">
        <v-col cols="12">
          <a class="d-flex align-start text-black text-decoration-none" href="/">
            <v-icon>mdi-chevron-left</v-icon>Back
          </a>
        </v-col>
        <v-col cols="12" class="text-center mb-4">
          <h1 class="text-primary font-weight-bold mb-0">CafeShop</h1>
          <p>Sign up your account</p>
        </v-col>
        <v-col cols="12">
          <form @submit.prevent="submit">
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                  <input
                    type="text"
                    v-model="username"
                    class="form-control"
                    placeholder="Username"
                    minlength="3"
                    maxlength="32"
                    required
                  />
                </div>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                    minlength="3"
                    maxlength="32"
                    required
                  />
                </div>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                  <input
                    type="text"
                    minlength="8"
                    maxlength="10"
                    v-model="phone"
                    class="form-control"
                    placeholder="Phone"
                    required
                  />
                </div>
              </v-col>
            </v-row>
            <div class="text-center my-16">
              <button type="submit" class="btn btn-primary text-white px-16">
                Sign up
              </button>
            </div>
            <div class="text-center">
              Already have an account? Sign in
              <a href="/login" class="text-primary">here</a>
            </div>
          </form>
        </v-col>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phone: "",
      registerMessage: "",
    };
  },
  methods: {
    validateFields() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{8,10}$/;
      if (
        this.username.length < 3 ||
        this.username.length > 32 ||
        this.password.length < 3 ||
        this.password.length > 32 ||
        !emailRegex.test(this.email) ||
        !phoneRegex.test(this.phone)
      ) {
        return false;
      }
      return true;
    },
    async submit() {
      if (!this.validateFields()) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in all fields correctly.',
        });
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/user/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone,
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Registration successful',
        });
        this.registerMessage = `Register successful: ${response.data}`;
        this.$router.push("/login");
      } catch (error) {
        let errorMessage = "";
        if (error.response && error.response.data) {
          errorMessage = `Register Failed: ${
            error.response.data.message || error.response.data
          }`;
        } else {
          errorMessage = `Registration failed: An error occurred: ${error.message}`;
        }
        this.registerMessage = errorMessage;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    },
  },
};
</script>

<style scoped>
.login-bg {
  background-color: #f5f5f5;
}
</style>
