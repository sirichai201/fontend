<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="pa-5" width="1000px">
        <v-col cols="12">
          <v-btn text :to="{ path: '/' }">
            <v-icon>mdi-chevron-left</v-icon>Back
          </v-btn>
        </v-col>
        <v-col cols="12" class="text-center">
          <h1 class="text-primary font-weight-bold">CafeShop</h1>
          <p>Sign up your account</p>
        </v-col>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation class="text-center">
            <v-text-field v-model="username" label="Username" :rules="usernameRules" required></v-text-field>
            <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required></v-text-field>
            <v-text-field v-model="phone" label="Phone Number" :rules="phoneRules" required></v-text-field>
            <v-col cols="12">
              <p>Already have an account? Sign in <a href="/login">here</a></p>
            </v-col>
            <v-col cols="12" class="text-center">
              <a class="btn btn-outline-success" style="width: 300px;" :disabled="!valid" color="success" @click="submit">Submit</a>
            </v-col>
          </v-form>
        </v-col>
      </v-card>
    </v-container>
</template>
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      phone: '',
      registerMessage: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3 && v.length <=32) || 'Username must be at least 3 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3 && v.length <=32) || 'Password must be at least 3 characters',
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
      ],
    };
  },
  methods: {
  async submit() {
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone,
      });
      alert(`Registration successful`);
      this.registerMessage = `Register successful: ${response.data}`;
      // this.$router.push('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        this.registerMessage = `Register Failed: ${error.response.data}`;
      } else {
        this.registerMessage = `Registration failed: An error occurred: ${error}`;
        alert('Registration failed: An error occurred');
      }
    }
  }
},

};
</script>
  
<style scoped>
</style>
