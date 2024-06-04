<template>
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
        v => (v && v.length >= 3) || 'Username must be at least 3 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
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
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          this.registerMessage = `Register Failed: ${response.data}`;
        } else {
          this.registerMessage = `Registration failed: An error occurred: ${response.data}`;
          alert('Registration failed: An error occurred');
        }
      }
    }
  },
};
</script>
  
<style scoped>
</style>
