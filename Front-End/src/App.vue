<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const mainFunForMount = async () => {
      if (route.path != "/signup" || route.path != "/login") {
        const userToken = localStorage.getItem("AuthToken");
        if (userToken) {
          const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: userToken }),
          };

          const resRequest = await fetch(
            "http://localhost:3000/checkTheAuth",
            requestOptions
          );
          const response = await resRequest.json();
          if (
            (response.successMessage == "Done" && route.path == "/login") ||
            route.path == "/signup"
          ) {
            router.push({ name: "Home" });
          }
        }
      }
    };

    onMounted(() => {
      mainFunForMount();
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");

#app {
  font-family: "Quicksand";
  height: 100vh;
  box-sizing: border-box;
}

.route-enter-from {
  opacity: 0;
}

.route-enter-to {
  opacity: 1;
}

.route-enter-active {
  transition: all 0.7s ease;
}

.route-leave-from {
  opacity: 1;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.7s ease;
}
</style>
