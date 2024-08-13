<template>
  <div class="h-100 text-black">
    <NavBar />
    <div
      class="w-100 d-flex flex-column justify-content-center align-items-center mt-4"
    >
      <router-link :to="{ path: '/' }" class="btn btn-outline-secondary"
        >Go Back</router-link
      >
      <hr class="w-100 text-black" />
    </div>

    <div
      class="row justify-content-center align-items-center d-flex flex-row w-100 mt-5"
    >
      <div
        class="container-fluid col-12 shadow justify-content-center align-items-center d-flex flex-column border border-secondary h-auto w-75 text-black rounded form-floating"
      >
        <div class="w-100 text-center text-black">
          <h3 class="pt-5">Edit Message</h3>
          <hr class="text-black w-100" />
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
            v-show="showErrorForRequiredInputs"
          >
            {{ errorForRequiredInputs }}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div
          class="needs-validation w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          novalidate
          v-if="theMood == 'Chat'"
        >
          <label for="fromWho" class="form-label">From Who</label>
          <input class="form-control" type="text" :value="userName" readonly />

          <label for="theMessage" class="form-label mt-2">The Message</label>
          <input type="text" class="form-control" v-model="theMessage" />

          <button
            class="btn btn-secondary text-white mt-3"
            @click="editMessage"
          >
            Edit
          </button>
        </div>
        <div
          class="needs-validation w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          novalidate
          v-else="theMood == 'Group'"
        >
          <label for="fromWho" class="form-label">From Who</label>
          <input class="form-control" type="text" :value="userName" readonly />

          <label for="theMessage" class="form-label mt-2">The Message</label>
          <input type="text" class="form-control" v-model="theMessage" />

          <button
            class="btn btn-secondary text-white mt-3"
            @click="editGroupMessage"
          >
            Edit
          </button>
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
const userName = ref(localStorage.getItem("UserName"));
const theMessage = ref(route.params.theMessage);
const theMood = ref(localStorage.getItem("Mood"));

const editGroupMessage = async () => {
  const messageID = route.params.id;
  const requestOptions = {
    method: "PATCH",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      theNewMessage: theMessage.value,
    }),
  };

  const response = await fetch(
    `http://localhost:3000/editGroupMessage/${messageID}`,
    requestOptions
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    router.push({ path: "/" });
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
};

const editMessage = async () => {
  const messageID = route.params.id;
  const requestOptions = {
    method: "PATCH",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      theNewMessage: theMessage.value,
    }),
  };

  const response = await fetch(
    `http://localhost:3000/editMessage/${messageID}`,
    requestOptions
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    router.push({ path: "/" });
    setTimeout(() => {
      window.location.reload();
    }, 10);
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
</script>
