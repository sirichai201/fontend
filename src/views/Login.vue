<template>
  <div class="login-container">
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" @input="checkForm" type="text" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" @input="checkForm" type="password" id="password" required>
      </div>
      <button :class="{ 'move-button': !isFormComplete }" @mouseover="moveButton" ref="loginButton" type="submit">Login</button>
      <p v-if="loginMessage" class="login-message">{{ loginMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginMessage: '',
      isFormComplete: false,
      originalButtonPosition: { left: '', top: '' },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/user/login', {
          username: this.username,
          password: this.password
        });
        this.loginMessage = `Login successful: ${response.data}`;
        this.$router.push('/main');
      } catch (error) {
        if (error.response && error.response.data) {
          this.loginMessage = `Login failed: ${error.response.data}`;
        } else {
          this.loginMessage = 'Login failed: An error occurred';
        }
      }
    },
    checkForm() {
      this.isFormComplete = this.username !== '' && this.password !== '';
      if (this.isFormComplete || (this.username === '' && this.password === '')) {
        this.resetButtonPosition();
      }
    },
    moveButton() {
      if (!this.isFormComplete) {
        const button = this.$refs.loginButton;
        const parentRect = button.parentElement.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const newLeft = Math.random() * (parentRect.width - buttonRect.width);
        const newTop = Math.random() * (parentRect.height - buttonRect.height);

        button.style.position = 'absolute';
        button.style.left = `${newLeft}px`;
        button.style.top = `${newTop}px`;
      }
    },
    resetButtonPosition() {
      const button = this.$refs.loginButton;
      button.style.position = '';
      button.style.left = this.originalButtonPosition.left;
      button.style.top = this.originalButtonPosition.top;
    }
  },
  mounted() {
    this.checkForm();
    this.$nextTick(() => {
      const button = this.$refs.loginButton;
      this.originalButtonPosition.left = button.style.left;
      this.originalButtonPosition.top = button.style.top;
    });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
}

.login-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
}

button:hover {
  background: #0056b3;
}

button.move-button {
  position: relative;
}

.login-message {
  margin-top: 10px;
  padding: 5px;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
