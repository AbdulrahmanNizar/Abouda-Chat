<template>
  <div class="h-100">
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
      class="w-100 d-flex flex-row justify-content-center align-items-center mt-3"
    >
      <div class="card w-75" data-bs-theme="dark">
        <h5 class="card-header">Message Details</h5>
        <div
          class="card-body"
          v-for="messageDetail in showMessageDetailsInDOM"
          v-if="theMood == 'Chat'"
        >
          <h5
            class="card-title fw-bold"
            v-if="messageDetail.fromWhoId == userId"
          >
            From Who: {{ userName }}
          </h5>
          <h5
            class="card-title fw-bold"
            v-if="messageDetail.fromWhoId != userId"
          >
            From Who: {{ theChater }}
          </h5>
          <h5
            class="card-text fw-bold mt-3"
            v-if="messageDetail.toWhoId == userId"
          >
            To Who: {{ userName }}
          </h5>
          <h5
            class="card-text fw-bold mt-3"
            v-if="messageDetail.toWhoId != userId"
          >
            To Who: {{ theChater }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            The Message: {{ messageDetail.theMessage }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            Message Time: {{ messageDetail.messageTime }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            Message Date: {{ messageDetail.messageDate }}
          </h5>
          <h5 class="card-text fw-bold mt-3" v-if="messageDetail.edited">
            Edited: Yes
          </h5>
          <h5 class="card-text fw-bold mt-3" v-else="messageDetail.edited">
            Edited: No
          </h5>
        </div>
        <div
          class="card-body"
          v-for="messageDetail in showMessageDetailsInDOM"
          v-else="theMood == 'Group'"
        >
          <h5
            class="card-title fw-bold"
            v-if="messageDetail.fromWhoId == userId"
          >
            From Who: {{ userName }}
          </h5>
          <h5
            class="card-title fw-bold"
            v-if="messageDetail.fromWhoId != userId"
          >
            From Who: {{ fromWhoTheMessage }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            The Message: {{ messageDetail.theMessage }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            Message Time: {{ messageDetail.messageTime }}
          </h5>
          <h5 class="card-text fw-bold mt-3">
            Message Date: {{ messageDetail.messageDate }}
          </h5>
          <h5 class="card-text fw-bold mt-3" v-if="messageDetail.edited">
            Edited: Yes
          </h5>
          <h5 class="card-text fw-bold mt-3" v-else="messageDetail.edited">
            Edited: No
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const userName = ref(localStorage.getItem("UserName"));
const userId = ref(localStorage.getItem("UserID"));
const theChater = ref(localStorage.getItem("LastChater"));
const theMood = ref(localStorage.getItem("Mood"));
const fromWhoTheMessage = ref("");
const showMessageDetailsInDOM = ref([]);

const getTheMessageDetails = async () => {
  const messageId = route.params.id;

  const response = await fetch(
    `http://localhost:3000/getMessageDetails/${messageId}/${theMood.value}`
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showMessageDetailsInDOM.value.push(data.messageDetails);
    const response = await fetch(
      `http://localhost:3000/getUserDetails/${data.messageDetails.fromWhoId}`
    );
    const dataTwo = await response.json();

    if (dataTwo.statusCode >= 200 && dataTwo.statusCode < 300) {
      fromWhoTheMessage.value = dataTwo.userDetails.username;
    }
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
setTimeout(getTheMessageDetails, 10);
</script>
