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
        class="container-fluid col-12 shadow justify-content-center align-items-center d-flex flex-column border border-secondary h-auto w-75 text-black rounded form-floating"
      >
        <div class="w-100 text-center text-black">
          <h3 class="pt-5">Sign Up</h3>
          <div
            class="w-100 d-flex flex-column justify-content-center align-items-center rounded border border-secondary shadow-sm p-2 my-3"
          >
            <ul class="d-flex flex-column py-2">
              <li>You Have To Write A Unique Username</li>
              <li>The Email Must Have The At Symbol: @</li>
              <li>The Password Must Be 7 Characters At Least</li>
              <li>The Confirm Password Must Match The Password</li>
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
              v-show="errorForPassword"
            >
              {{ errorMessageForPassword }}
            </div>
          </transition>
          <transition name="fadeError">
            <div
              class="alert alert-danger"
              role="alert"
              v-show="errorForConfirmPassword"
            >
              {{ errorMessageForConfirmPassword }}
            </div>
          </transition>
          <transition name="fadeError">
            <div
              class="alert alert-danger"
              role="alert"
              v-show="errorForUserExcites"
            >
              {{ userIsAlreadyExcitesMessage }}
            </div>
          </transition>
          <transition name="fadeError">
            <div class="alert alert-danger" role="alert" v-show="errorForEmail">
              {{ errorMessageForEmail }}
            </div>
          </transition>
        </div>
        <div
          class="needs-validation w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          novalidate
        >
          <label for="usernameInput" class="form-label">Username</label>
          <input
            type="text"
            v-model="formData.username"
            class="form-control mb-2 col-3"
            id="usernameInput"
            placeholder="Username"
            required
          />

          <label for="floatingInput">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-control mb-2 col-3"
            id="floatingInput"
            placeholder="Email"
            required
          />

          <label for="passwordInput" class="form-label">Password</label>
          <input
            type="password"
            v-model="formData.password"
            class="form-control mb-2 col-3"
            id="passwordInput"
            placeholder="Password"
            required
          />

          <label for="passwordConfirmInput" class="form-label"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="formData.confirmPassword"
            class="form-control mb-2 col-3"
            id="passwordConfirmInput"
            placeholder="Confirm Password"
            required
          />

          <button class="btn btn-secondary text-white mt-3" @click="signUp">
            Sign Up
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const router = useRouter();
const errorMessageForEmail = ref("");
const errorMessageForPassword = ref("");
const errorMessageForConfirmPassword = ref("");
const errorForConfirmPassword = ref(false);
const errorForPassword = ref(false);
const errorForEmail = ref(false);
const showRequestLoading = ref(false);
const errorForUserExcites = ref(false);
const userIsAlreadyExcitesMessage = ref("");
const showErrorForRequiredInputs = ref(false);
const errorForRequiredInputs = ref("");

const formData = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const formRules = {
  username: { required },
  email: { required },
  password: { required },
  confirmPassword: { required },
};

const v$ = useVuelidate(formRules, formData);

const signUp = async () => {
  if (
    formData.username != "" &&
    formData.email != "" &&
    formData.password != "" &&
    formData.confirmPassword != ""
  ) {
    if (formData.email.includes("@") == false) {
      errorForEmail.value = true;
      errorMessageForEmail.value =
        "Invalid Email, The Email Must Have The At Symbol: @";

      setTimeout(() => {
        errorForEmail.value = false;
      }, 3000);
    } else if (
      formData.confirmPassword != "" &&
      formData.password != "" &&
      formData.confirmPassword != formData.password
    ) {
      errorMessageForConfirmPassword.value = "The Password Doesn't Match";
      errorForConfirmPassword.value = true;

      setTimeout(() => {
        errorForConfirmPassword.value = false;
      }, 3000);
    } else if (formData.password != "" && formData.password.length < 7) {
      errorMessageForPassword.value = "The Password Is Too Weak";
      errorForPassword.value = true;

      setTimeout(() => {
        errorForPassword.value = false;
      }, 3000);
    } else {
      const validateResult = await v$.value.$validate();
      if (validateResult && formData.confirmPassword == formData.password) {
        showRequestLoading.value = true;
        const requestOptions = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username.toLowerCase(),
            email: formData.email.toLowerCase(),
            password: formData.password.toLowerCase(),
          }),
        };

        const response = await fetch(
          "http://localhost:3000/signup",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          showRequestLoading.value = false;
          const token = data.token;
          const UserID = data.UserID;
          const userName = data.userName;

          localStorage.setItem("AuthToken", token);
          localStorage.setItem("UserID", UserID);
          localStorage.setItem("UserName", userName);

          router.push({ path: "/" });
          setTimeout(() => {
            window.location.reload();
          }, 10);
        } else {
          showRequestLoading.value = false;
          userIsAlreadyExcitesMessage.value = data.errorMessage;
          errorForUserExcites.value = true;

          setTimeout(() => {
            errorForUserExcites.value = false;
          }, 3000);
        }
      }
    }
  } else {
    errorForRequiredInputs.value = "All The Inputs Are Required";
    showErrorForRequiredInputs.value = true;

    setTimeout(() => {
      showErrorForRequiredInputs.value = false;
    }, 3000);
  }
};
</script>
