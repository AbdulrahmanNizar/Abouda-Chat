<template>
  <div class="h-100 text-black">
    <nav
      class="navbar navbar-expand-md bg-black bg-gradient text-black d-flex flex-sm-column flex-lg-row justify-content-lg-start justify-content-center align-items-lg-start align-items-center text-center"
    >
      <div
        class="container-fluid d-flex flex-column flex-lg-row justify-content-lg-between justify-content-center align-items-lg-center p-2 text-center"
      >
        <div class="navbar-brand ps-4">
          <h4 class="display-5 text-white">Abouda Chat</h4>
        </div>
        <div class="btn-group pe-4 d-md-block d-none">
          <router-link
            class="btn btn-outline-secondary text-white btn-lg"
            :to="{ path: '/login' }"
            >Login</router-link
          >

          <router-link
            class="btn btn-outline-secondary text-white btn-lg"
            :to="{ path: '/signup' }"
            >Sign Up</router-link
          >
        </div>
        <div class="btn-group d-md-none d-block">
          <router-link
            class="btn btn-outline-secondary text-white btn-lg"
            :to="{ path: '/login' }"
            >Login</router-link
          >

          <router-link
            class="btn btn-outline-secondary text-white btn-lg"
            :to="{ path: '/signup' }"
            >Sign Up</router-link
          >
        </div>
      </div>
    </nav>

    <div
      class="row justify-content-center align-items-center d-flex flex-row w-100 h-75"
    >
      <div
        class="col-12 justify-content-center align-items-center d-flex flex-column shadow h-auto w-75 text-black border border-secondary rounded"
      >
        <div class="w-100 text-center text-black">
          <h3 class="pt-5">Login</h3>
          <div
            class="w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary shadow-sm p-2 my-3"
          >
            <ul class="d-flex flex-column pt-2">
              <li>The Email Must Have The At Symbol: @</li>
            </ul>
          </div>
          <hr class="text-black w-100" />
          <transition name="fadeError">
            <div
              class="alert alert-danger"
              role="alert"
              v-show="showErrorForRequiredInputs"
            >
              {{ errorForRequiredInputs }}
            </div>
          </transition>
          <transition name="fadeError">
            <div
              class="alert alert-danger"
              role="alert"
              v-show="showErrorMessage"
            >
              {{ errorMessage }}
            </div>
          </transition>
          <transition name="fadeError">
            <div
              class="alert alert-danger"
              role="alert"
              v-show="showErrorForEmail"
            >
              {{ errorMessageForEmail }}
            </div>
          </transition>
        </div>
        <div
          class="needs-validation w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          novalidate
        >
          <label for="emailInput" class="form-label">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-control mb-2 col-6"
            id="emailInput"
            placeholder="Email"
            required
          />

          <label for="passwordInput" class="form-label">Password</label>
          <input
            type="password"
            v-model="formData.password"
            @keyup.enter="login"
            class="form-control mb-2 col-6"
            id="passwordInput"
            placeholder="Password"
            required
          />

          <router-link
            class="text-decoration-none mt-2"
            :to="{ path: '/forgetPassword' }"
            >Forget Password?</router-link
          >
          <button class="btn btn-secondary text-white mt-3" @click="login">
            Login
          </button>
        </div>
      </div>
    </div>
    <transition name="fadeSpinner">
      <div
        class="d-flex flex-row justify-content-center align-items-center bg-white p-3 rounded shadow position-absolute top-50 end-50"
        v-if="showRequestLoading"
      >
        <div
          class="spinner-border text-secondary"
          role="status"
          v-show="showRequestLoading"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const showErrorForRequiredInputs = ref(false);
const errorForRequiredInputs = ref("");
const errorMessage = ref("");
const showErrorMessage = ref(false);
const showRequestLoading = ref(false);
const showErrorForEmail = ref(false);
const errorMessageForEmail = ref("");
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const formRules = {
  email: { required },
  password: { required },
};

const v$ = useVuelidate(formRules, formData);

const login = async () => {
  if (formData.email != "" && formData.password != "") {
    if (formData.email.includes("@") == false) {
      showErrorForEmail.value = true;
      errorMessageForEmail.value =
        "Invalid Email, The Email Must Have The At Symbol: @";

      setTimeout(() => {
        showErrorForEmail.value = false;
      }, 3000);
    } else {
      const formResult = await v$.value.$validate();
      if (formResult) {
        showRequestLoading.value = true;
        const requestOptions = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            password: formData.password.toLowerCase(),
          }),
        };

        const response = await fetch(
          "http://localhost:3000/login",
          requestOptions
        );

        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          showRequestLoading.value = false;
          const token = data.token;
          const UserName = data.userName;
          const UserID = data.UserID;

          localStorage.setItem("AuthToken", token);
          localStorage.setItem("UserName", UserName);
          localStorage.setItem("UserID", UserID);

          formData.email = "";
          formData.password = "";

          router.push({ path: "/" });
          setTimeout(() => {
            window.location.reload();
          }, 10);
        } else {
          showRequestLoading.value = false;
          errorMessage.value = data.errorMessage;
          showErrorMessage.value = true;
          setTimeout(() => {
            showErrorMessage.value = false;
          }, 3000);
        }
      }
    }
  } else {
    showErrorForRequiredInputs.value = true;
    errorForRequiredInputs.value = "All The Inputs Are Required";
    setTimeout(() => {
      showErrorForRequiredInputs.value = false;
    }, 3000);
  }
};
</script>
