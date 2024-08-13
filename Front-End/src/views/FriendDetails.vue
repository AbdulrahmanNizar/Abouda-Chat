<template>
  <div class="h-100 text-black bg-light bg-gradient">
    <NavBar />

    <div
      class="w-100 d-flex flex-column justify-content-center align-items-center mt-4"
    >
      <button class="btn btn-outline-secondary" @click="goBack">Go Back</button>
      <hr class="w-100 text-black" />
    </div>

    <div
      class="w-100 d-flex flex-column justify-content-center align-items-center p-5 mt-3"
    >
      <div class="card w-75" data-bs-theme="dark">
        <h3 class="card-header">Friend Details</h3>
        <div class="card-body" v-for="friendDetail in showFriendDetailsInDOM">
          <h5 class="card-text fw-bold">
            Username: {{ friendDetail.username }}
          </h5>
          <h5 class="card-text mt-3 fw-bold">
            Email: {{ friendDetail.email }}
          </h5>
          <h5 class="card-text mt-3 fw-bold">
            Description: {{ friendDetail.description }}
          </h5>
          <h5 class="card-text fw-bold mt-3" v-if="friendDetail.online">
            Online: Yes
          </h5>
          <h5 class="card-text fw-bold mt-3" v-else="friendDetail.online">
            Online: No
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const showFriendDetailsInDOM = ref([]);

const goBack = () => {
  router.go(-1);
};

const getTheUserDetails = async () => {
  const friendId = route.params.id;

  const response = await fetch(
    "http://localhost:3000/getUserDetails/" + friendId
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showFriendDetailsInDOM.value.push(data.userDetails);
  }
};

const checkTheAuth = async () => {
  const userToken = localStorage.getItem("AuthToken");

  if (userToken) {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken }),
    };

    const request = await fetch(
      "http://localhost:3000/checkTheAuth",
      requestOptions
    );
    const response = await request.json();
    if (response.statusCode == 400) {
      router.push({ path: "/login" });
      localStorage.clear();
    }
  } else {
    router.push({ path: "/login" });
    localStorage.clear();
  }
};

setInterval(checkTheAuth, 10000);
setTimeout(getTheUserDetails, 10);
</script>
