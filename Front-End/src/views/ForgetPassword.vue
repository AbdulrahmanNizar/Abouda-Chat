<template>
  <div class="h-100 text-black">
    <NavBar />

    <div
      class="w-100 mt-3 d-flex flex-column justify-content-center align-items-center"
    >
      <router-link :to="{ path: '/login' }" class="btn btn-outline-secondary"
        >Go Back</router-link
      >
      <hr class="text-black w-100" />
    </div>

    <div
      class="row justify-content-center align-items-center d-flex flex-row w-100 mt-5"
    >
      <div
        class="container-fluid col-12 shadow justify-content-center align-items-center d-flex flex-column border border-secondary h-auto w-75 text-black rounded form-floating"
      >
        <div class="w-100 text-center text-black">
          <h3 class="pt-5">Forget Password</h3>
          <hr class="text-black w-100" />
          <transition name="fadeError" v-show="showErrorForEmail">
            <div class="alert alert-danger fade show" role="alert">
              {{ errorForEmail }}
            </div>
          </transition>
          <transition name="fadeError" v-show="showErrorForRequiredInput">
            <div class="alert alert-danger fade show" role="alert">
              {{ errorForRequiredInput }}
            </div>
          </transition>
        </div>
        <div
          class="needs-validation w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          novalidate
        >
          <label for="forEmail" class="form-label">Email</label>
          <input
            @keyup.enter="sendEmail"
            v-model="userEmail"
            type="email"
            class="form-control"
            id="forEmail"
            placeholder="Enter Your Email"
          />

          <button class="btn btn-secondary mt-3" @click="sendEmail">
            Send Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";

const userEmail = ref("");
const errorForEmail = ref("");
const errorForRequiredInput = ref("");
const showErrorForEmail = ref(false);
const showErrorForRequiredInput = ref(false);

const sendEmail = async () => {
  if (userEmail.value != "") {
    if (userEmail.value.includes("@") == true) {
      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theEmail: userEmail.value,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/sendEmailForForgetPassword",
        requestOptions
      );
      const data = await response.json();
      if (data.statusCode >= 200 && data.statusCode < 300) {
      }
    } else {
      showErrorForEmail.value = true;
      errorForEmail.value =
        "Invalid Email, The Email Must Have The At Symbol: @";

      setTimeout(() => {
        showErrorForEmail.value = false;
      }, 3000);
    }
  } else {
    showErrorForRequiredInput.value = true;
    errorForRequiredInput.value = "The Email Input Is Required";

    setTimeout(() => {
      showErrorForRequiredInput.value = false;
    }, 3000);
  }
};
</script>
