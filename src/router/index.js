import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/Main.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "",  // This is the default sub-path for the root
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "userprofile",
        name: "userprofile",
        component: () => import("../views/UserProfile.vue"),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("../views/Menu.vue"),
      },
      {
        path: "menu/:id",
        name: "MenuDetail",
        component: () => import("../views/MenuDetail.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/Cart.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("../components/AdminNav.vue"),
    children: [
      {
        path: "dashboard",  // This is the default sub-path for the admin
        name: "dashboard",
        component: () => import("../views/Admin.vue"),
      },
      {
        path: "products", 
        name: "products", 
        component: () => import("../views/Products.vue"),
      },
      {
        path: "users", 
        name: "users", 
        component: () => import("../views/Users.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
