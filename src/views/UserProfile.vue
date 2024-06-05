<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    </v-container>
    <div class="hero-bg">
      <v-container>
        <div class="card mt-8 mb-16 border-0">
          <div
            class="card-header d-flex flex-wrap justify-content-between bg-white pa-8"
          >
            <div>
              <h1 class="mb-0">Welcome!</h1>
              <div class="d-flex">
                Today is &nbsp;
                <date-pick
                  v-model="date"
                  :format="format"
                  :parseDate="parseDate"
                  :formatDate="formatDate"
                  :disable="true"
                ></date-pick>
              </div>
            </div>
            <div>
              <a
                class="d-flex align-start text-black text-decoration-none"
                href="/"
              >
                <v-icon>mdi-chevron-left</v-icon>Back
              </a>
            </div>
          </div>

          <v-form @submit.prevent="saveChanges">
            <div class="card-body bg-white pa-8">
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <label>Username</label>
                  <input
                    class="form-control"
                    v-model="postdata.username"
                    disabled
                    readonly
                  />
                </v-col>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <label>Password</label>
                  <input class="form-control" v-model="postdata.password" />
                </v-col>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <label>Email</label>
                  <input
                    class="form-control"
                    v-model="postdata.email"
                    type="email"
                    disabled
                    readonly
                  />
                </v-col>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <label>Phone</label>
                  <input
                    class="form-control"
                    type="text"
                    minlength="10"
                    maxlength="10"
                    v-model="postdata.phone"
                  />
                </v-col>
              </v-row>

              <div class="mt-12">
                <div class="point">
                  <label>Points</label>
                  <p class="mb-0">
                    You have  <b class="text-success">{{ postdata.point }} </b> Points
                  </p>
                  <button class="btn btn-success-wh text-white mt-1">
                    Redeem Point
                  </button>
                </div>
                <div class="history mt-6">
                  <label class="d-block">History</label>
                  <button class="btn btn-info mt-1 mr-4">
                    Purchase History
                  </button>
                  <button class="btn btn-info mt-1">Redeem History</button>
                </div>
                <div class="danger mt-6">
                  <label class="d-block">Danger Zone</label>
                  <button class="btn btn-danger mt-1">Delete Account</button>
                </div>
              </div>
            </div>

            <div class="card-footer bg-white pa-8 d-flex justify-content-end">
              <button class="btn btn-outline-secondary px-12 mr-4" @click="cancelChanges">
                Cancel
              </button>
              <button class="btn btn-success px-12" type="submit">
                Save Change
              </button>
            </div>
          </v-form>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Profile } from "@/assets/data/Breadcrumb.js";
import DatePick from "vue-date-pick";
import fecha from "fecha";
import axios from "axios";

export default {
  components: { DatePick },
  data() {
    return {
      items: Profile,
      format: "dddd MMMM Do, YYYY",
      date: fecha.format(new Date(), "dddd MMMM Do, YYYY"),
      postdata: {
        id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        point: "",
        role: "",
        status: "",
      },
    };
  },
  methods: {
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    fetchData() {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        this.postdata = JSON.parse(userData);
      } else {
        axios
          .get("http://localhost:3000/api/user/user")
          .then((response) => {
            const data = response.data[2];
            this.postdata = {
              id: data._id,
              username: data.username,
              password: data.password,
              email: data.email,
              phone: data.phone,
              point: data.point,
              role: data.role,
              status: data.status,
            };
            localStorage.setItem("user_data", JSON.stringify(this.postdata));
          })
          .catch((error) => {
            console.error("There was an error fetching the user data!", error);
          });
      }
    },
    saveChanges() {
      axios
        .put(`http://localhost:3000/api/user/updateUser/${this.postdata.id}`, {
          username: this.postdata.username,
          email: this.postdata.email,
          point: this.postdata.point,
          password: this.postdata.password,
          phone: this.postdata.phone,
          role: this.postdata.role,
          status: this.postdata.status,
        })
        .then(() => {
          localStorage.setItem("user_data", JSON.stringify(this.postdata));
          alert("Changes saved successfully!");
        })
        .catch((error) => {
          console.error("There was an error saving the changes!", error);
        });
    },
    cancelChanges() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>

