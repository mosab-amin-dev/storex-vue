import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const routes =  [
  {
    path: "/login",
    name:Login,
    component: Login,
  },
  {
    path: "/register",
    name:Register,
    component: Register,
  },
  {
    path: "/movies",
    alias: "/",
    name: "movies",
    component: () => import("./components/MoviesList")
  },
  {
    path: "/movies/add",
    name: "add",
    component: () => import("./components/AddMovie")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')
      // If logged in, or going to the Login page.
      if (user || to.name === Login||to.name === Register) {
        // Continue to page.
        next()
      } else {
        // Not logged in, redirect to login.
        next({name: Login})
      }
    }
  );

export default router;