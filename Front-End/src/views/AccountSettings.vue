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
          <h3 class="pt-5">Account Settings</h3>
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
          v-for="accountDetail in showAccountDetailsInDOM"
        >
          <label for="userName" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="newUsername" />

          <label for="forEmail" class="form-label mt-2">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="accountDetail.email"
            readonly
          />

          <label for="forDescription" class="form-label mt-2"
            >Description</label
          >
          <textarea
            type="text"
            class="form-control"
            col="20"
            rows="5"
            v-model="newDescription"
          ></textarea>

          <button
            class="btn btn-secondary text-white mt-3"
            @click="setNewSettings"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref(localStorage.getItem("UserName"));
const userId = ref(localStorage.getItem("UserID"));
const showAccountDetailsInDOM = ref([]);
const newDescription = ref();
const newUsername = ref();

const setNewSettings = async () => {
  if (newDescription.value != "" && newUsername.value != "") {
    const requestOptions = {
      method: "PATCH",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountName: newUsername.value,
        accountDescription: newDescription.value,
      }),
    };

    const response = await fetch(
      "http://localhost:3000/editAccountSettings/" + userId.value,
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      if (userName.value != newUsername.value) {
        const response = await fetch(
          "http://localhost:3000/getUserDetails/" + userId.value
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          for (let i = 0; i < data.userDetails.length; i++) {
            localStorage.setItem("UserName", data.userDetails[i].username);
          }
          router.push({ path: "/" });
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      } else if (userName.value == newUsername.value) {
        router.push({ path: "/" });
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }
    } else {
    }
  }
};

const getUserDetails = async () => {
  const response = await fetch(
    "http://localhost:3000/getUserDetails/" + userId.value
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showAccountDetailsInDOM.value.push(data.userDetails);
    newDescription.value = data.userDetails.description;
    newUsername.value = data.userDetails.username;
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
      router.push({ name: "Login" });
      localStorage.clear();
    }
  } else {
    router.push({ name: "Login" });
    localStorage.clear();
  }
};

setInterval(checkTheAuth, 10000);
setTimeout(getUserDetails, 10);
</script>
