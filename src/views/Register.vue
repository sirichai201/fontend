 <!-- <template>
    <v-container>
      <v-card-text style="width: 1000px;" class="pa-4">
        <h1>สมัครสมาชิก</h1>
        <v-btn text :to="{ path: '/' }"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-text-field v-model="username" label="Username" :rules="usernameRules" required></v-text-field>
            <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required></v-text-field>
            <v-text-field v-model="phone" label="Phone Number" :rules="phoneRules" required></v-text-field>
            <v-row>
                <v-col cols="12">
                    <h5>Already have account? Sign in</h5><v-btn text :to="{ path: '/login' }">here</v-btn>
                </v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" @click="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-container>
  </template> -->
  <template>
  <div class="login-bg">
  <v-container class="min-vh-100 d-flex justify-content-center align-center login-bg">
    <v-card style="width: 800px" class="pa-4">
      <v-col cols="12">
        <a class="d-flex align-start text-black text-decoration-none" href="/">
          <v-icon>mdi-chevron-left</v-icon>Back</a
        >
      </v-col>
      <v-col cols="12" class="text-center mb-4">
        <h1 class="text-primary font-weight-bold mb-0">CafeShop</h1>
        <p>Sign up you account</p>
      </v-col>
      <v-col cols="12">
        <form action="">
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                <input
                  type="text"
                  v-model="username"
                  :rules="usernameRules"
                  class="form-control"
                  placeholder="Username"
                  :minlength="3"
                  :maxlength="32"
                  required
                />
              </div>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                <input
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  class="form-control"
                  placeholder="Password"
                  :minlength="3"
                  :maxlength="32"
                  required
                />
              </div>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="mb-lg-0 mb-md-2 mb-sm-2 md-2">
                <input
                  type="email"
                  v-model="email"
                  :rules="emailRules"
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
                  :rules="phoneRules"
                  class="form-control"
                  placeholder="Phone"
                  required
                />
              </div>
            </v-col>
          </v-row>
          <div class="text-center my-16">
            <button class="btn btn-primary text-white px-16">Sign up</button>
          </div>
          <div class="text-center">
            Already have account ? Sign in
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

export default {
  data() {
    return {
      valid: false,
      username: "",
      email: "",
      password: "",
      phone: "",
      registerMessage: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 3) || "Username must be at least 3 characters",
        (v) =>
          (v && v.length <= 32) || "Username must be less than 32 characters",
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 3) || "Username must be at least 3 characters",
        (v) =>
          (v && v.length <= 32) || "Username must be less than 32 characters",
      ],
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => (v && v.length >= 8) || "Username must be at least 8 characters",
        (v) =>
          (v && v.length <= 10) || "Username must be less than 10 characters",
      ],
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone,
          }
        );
        alert(`Registration successful`);
        this.registerMessage = `Register successful: ${response.data}`;
        this.$router.push("/login");
      } catch (error) {
        let errorMessage = "";
        if (error.response) {
          errorMessage = `Register Failed: ${error.response.data}`;
        } else {
          errorMessage = `Registration failed: An error occurred: ${error}`;
        }
        this.registerMessage = errorMessage;
        alert(errorMessage);
      }
    },
  },
};
</script>

<style scoped>
</style>
