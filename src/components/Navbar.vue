<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm py-4">
      <div class="container-fluid">
        <a class="navbar-brand text-primary font-weight-bold" href="/"
          >CafeShop</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href="/" class="nav-link">Foods</a>
            </li>
            <li class="nav-item">
              <a href="/allweapon" class="nav-link">Drinks</a>
            </li>
            <li class="nav-item">
              <a href="/features" class="nav-link">Appetizers</a>
            </li>
            <li class="nav-item">
              <a href="/allBundle" class="nav-link">Menu</a>
            </li>
            <li class="nav-item">
              <a href="/allBundle" class="nav-link">About us</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item mr-2">
                <a href="" class="nav-link"
                  ><i class="fa-solid fa-cart-shopping fa-xl"></i></a>
              </li>
              <li class="nav-item mr-2">
                <a href="/login" class="nav-link btn btn-success">Sign in</a>
              </li>
              <li class="nav-item">
                <a href="/register" class="nav-link btn btn-outline-success"
                  >Sign up</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <v-main>
      <router-view />
    </v-main>

    <!-- <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ isLogin ? 'Login' : 'Register' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-if="isLogin" v-model="username" label="Username" required></v-text-field>
            <v-text-field v-if="!isLogin" v-model="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-text-field v-if="!isLogin" v-model="name" label="Name" required></v-text-field>
            <v-text-field v-if="!isLogin" v-model="age" label="Age" type="number" required></v-text-field>
            <v-text-field v-if="!isLogin" v-model="city" label="City" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="isLogin ? handleLogin() : handleRegister()">{{ isLogin ? 'Sign In' : 'Register' }}</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
        <v-card-actions v-if="isLogin">
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isLogin = false">Don't have an account? Register</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isLogin = true">Already have an account? Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      isLogin: true,
      username: "",
      email: "",
      password: "",
      name: "",
      age: "",
      city: "",
      valid: true,
    };
  },
  methods: {
    openDialog(type) {
      this.isLogin = type === "login";
      this.dialog = true;
    },
    handleLogin() {
      if (this.$refs.form.validate()) {
        alert(`Username: ${this.username}\nPassword: ${this.password}`);
        this.dialog = false;
      }
    },
    handleRegister() {
      if (this.$refs.form.validate()) {
        const userData = {
          email: this.email,
          password: this.password,
          name: this.name,
          age: parseInt(this.age, 10), // Ensure age is an integer
          city: this.city,
        };
        console.log("Posting data:", userData);
        this.axios
          .post("http://localhost:8000/api/createProfile", userData)
          .then((response) => {
            console.log(response);
            alert("✅ User registered successfully!");
            this.dialog = false;
          })
          .catch((error) => {
            console.error("Error posting data:", error);
            if (error.response) {
              console.error("Error response data:", error.response.data);
              alert(
                `Failed to register user: ${
                  error.response.data.message || error.response.data
                }`
              );
            } else {
              alert("Failed to register user.");
            }
          });
      }
    },
  },
};
</script>

<style></style>
