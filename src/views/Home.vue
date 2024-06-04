<template>
  <div>
    <v-container class="my-16">
      <v-row class="text-center justify-content-center">
        <v-col lg="6" md="8" sm="12">
          <h1>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
        </v-col>
      </v-row>
      <v-row class="text-center justify-content-center">
        <v-col lg="4" md="6" sm="12">
          <p class="mb-3">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit
            amet,consectetur, adipisci velit.
          </p>
        </v-col>
      </v-row>

      <v-row class="text-center justify-content-center">
        <v-col lg="6" md="8" sm="12">
          <form>
            <input
              type="text"
              name=""
              class="form-control"
              placeholder="Search"
            />
          </form>
        </v-col>
      </v-row>
    </v-container>

    <div class="mt-16">
      <img class="w-100 h-auto" src="@/assets/img/Image.png" alt="Food Image" />
    </div>

    <v-container>
      <v-row class="mt-lg-16 mt-4">
        <v-col
          lg="6"
          md="6"
          sm="12"
          cols="12"
          class="pr-12 d-flex align-items-center"
        >
          <div>
            <h1 class="mb-5">
              <h1 class="text-primary d-inline">Freshly</h1>
              from stove, <br />
              serve the best taste.
            </h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12" class="mb-lg-12 mb-0">
          <v-img
            class="home-hero-image w-100"
            src="https://ufm.co.th/wp-content/uploads/2023/12/delectable-banoffee-pie-beige-gold-tones-british-classic-2-1024x683.jpg"
            alt="Food Image"
          >
          </v-img>
        </v-col>

        <v-col lg="6" md="6" sm="12" cols="12">
          <v-img
            class="home-hero-image-2 w-100"
            src="https://i.pinimg.com/originals/c4/d3/c6/c4d3c6d55568508441408eae3fecd6aa.jpg"
            alt="Food Image"
          >
          </v-img>
        </v-col>
        <v-col
          lg="6"
          md="6"
          sm="12"
          cols="12"
          class="pl-lg-12 pl-auto d-flex align-items-center"
        >
          <div>
            <h1 class="mb-5">
              Imported premium <br /><h1 class="text-success d-inline">ingredients</h1>.
            </h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="bg-success-light mt-lg-16 mt-md-5">
      <v-container class="py-16">
        <v-carousel hide-delimiters class="rounded-main">
          <v-carousel-item
            v-for="(item, index) in Promotion"
            :key="index"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-container>
    </div>

    <v-container class="mb-16 mt-10">
      <h1 class="mb-4">
        Recommend <h1 class="text-primary d-inline">dishes</h1>.
      </h1>
      <v-row>
        <v-col
          lg="4"
          md="4"
          sm="12"
          cols="12"
          v-for="(item, i) in sortedMenu.slice(0, 3)"
          :key="i"
        >
          <v-card :loading="loading" class="mx-auto bg-white">
            <v-img :src="item.img" height="250"></v-img>
            <div class="p-2">
              <v-card-title class="d-flex justify-content-between flex-wrap align-items-center pb-0">
                <h5 class="mb-0">{{ item.name }}</h5>
                <span class="category">{{ item.category }}</span>
              </v-card-title>
    
              <v-card-text>
                <h1 class="d-block text-dark">{{ item.price }} ฿</h1>
                <div class="my-5">{{ item.shortDesc }}</div>
              </v-card-text>
    
              <v-card-actions class="d-flex justify-content-center">
                <button class="btn btn-outline-success px-16 mb-5">
                  Add to cart
                </button>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="bg-danger-light">
      <v-container class="py-16">
        <div class="text-center mb-10">
          <h1>Have a question ?</h1>
          <p>Frequently asked question from our loyal customers.</p>
        </div>
        <div class="accordion my-10" id="accordionExample">
          <div class="accordion-item" v-for="(item, i) in 5" :key="i">
            <h2 class="accordion-header" :id="'heading' + i">
              <button
                class="accordion-button collapsed py-5"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + i"
                aria-expanded="false"
                :aria-controls="'collapse' + i"
              >
                Accordion Item #{{ i + 1 }}
              </button>
            </h2>
            <div
              :id="'collapse' + i"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + i"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bg-white">
                Placeholder content for this accordion, which is intended to
                demonstrate the <code>.accordion-flush</code> class. This is
                item #{{ i + 1 }}'s accordion body. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Ullam fugiat recusandae id animi!
                Ducimus, odit ipsa. Dolorem soluta deserunt possimus, deleniti
                sunt labore iure, animi nostrum dolorum in blanditiis molestias!
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Promotion } from "@/assets/data/Home.js";
import { Menu } from "@/assets/data/MockData.js";

export default {
  data() {
    return {
      Promotion,
      loading: false,
      sortedMenu: [],
    };
  },
  created() {
    this.sortedMenu = Menu.sort((a, b) => b.name.localeCompare(a.name));
  },
};
</script>

<style></style>
