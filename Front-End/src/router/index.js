import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import SignUp from "@/views/SignUp.vue";
import Home from "@/views/Home.vue";
import EditMessage from "@/views/EditMessage.vue";
import AccountSettings from "@/views/AccountSettings.vue";
import GroupSettings from "@/views/GroupSettings.vue";
import MessageDetails from "@/views/MessageDetails.vue";
import FriendDetails from "@/views/FriendDetails.vue";
import GroupDetails from "@/views/GroupDetails.vue";
import MobileChat from "@/views/MobileChat.vue";
import ForgetPassword from "@/views/ForgetPassword.vue";

const routes = [
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "EditMessage",
    path: "/editMessage/:id/:theMessage",
    component: EditMessage,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "AccountSettings",
    path: "/account",
    component: AccountSettings,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "GroupSettings",
    path: "/groupSettings/:id",
    component: GroupSettings,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "MessageDetails",
    path: "/messageDetails/:id",
    component: MessageDetails,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "FriendDetails",
    path: "/friendDetails/:id",
    component: FriendDetails,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "GroupDetails",
    path: "/groupDetails/:id",
    component: GroupDetails,
    meta: {
      needsAuth: localStorage.getItem("AuthToken") ? false : true,
    },
  },
  {
    name: "MobileChat",
    path: "/chat",
    component: MobileChat,
    meta: {
      needsMobileAccess: localStorage.getItem("mobileChat") ? false : true,
    },
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "ForgetPassword",
    path: "/forgetPassword",
    component: ForgetPassword,
  },
  {
    name: "NotFound",
    path: "/:pathName(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth == true) {
    next("/login");
  } else if (to.meta.needsMobileAccess == true) {
    next("/");
  } else {
    next();
  }
});

export default router;
