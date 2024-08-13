<template>
  <div class="h-100 text-black">
    <NavBar />

    <div
      class="w-100 mt-3 d-flex flex-column justify-content-center align-items-center"
    >
      <router-link :to="{ path: '/' }" class="btn btn-outline-secondary"
        >Go Back</router-link
      >
      <button
        class="btn btn-outline-danger mt-2"
        @click="leaveGroup"
        v-if="theCreaterName != userName"
      >
        Leave Group
      </button>
      <hr class="text-black w-100" />
    </div>

    <div
      class="justify-content-center align-items-center d-flex flex-row w-100 mt-3"
    >
      <div
        class="container-fluid col-12 shadow justify-content-center align-items-center d-flex flex-column border border-secondary h-auto w-75 text-black rounded form-floating"
      >
        <div class="w-100 text-center text-black">
          <h3 class="pt-5">Group Settings</h3>
          <hr class="text-black w-100" />
        </div>
        <div
          class="w-50 h-100 d-flex flex-column justify-content-center align-items-start mb-5 row"
          v-for="groupDetail in showGroupDetails"
        >
          <h4>The Group Name: {{ groupDetail.theGroupName }}</h4>
          <h4 class="mt-2">The Group Creater: {{ theCreaterName }}</h4>
          <h4 class="mt-2">The Group Time: {{ groupDetail.groupTime }}</h4>
          <h4 class="mt-2">The Group Date: {{ groupDetail.groupDate }}</h4>
          <hr class="text-black w-100" />

          <button
            class="btn btn-secondary mt-2"
            data-bs-toggle="modal"
            data-bs-target="#seeGroupMatesModal"
          >
            See Group Mates
          </button>
          <button
            class="btn btn-secondary mt-2"
            data-bs-toggle="modal"
            data-bs-target="#seeGroupAdminsModal"
          >
            See Group Admins
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="seeGroupMatesModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel2">
              The Group Mates
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul
              class="list-group"
              v-for="(groupMate, index) in showGroupMatesNames"
            >
              <li class="list-group-item">{{ index + 1 }}- {{ groupMate }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="seeGroupAdminsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel2">
              The Group Admins
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <button
                class="list-group-item list-group-action text-start"
                v-for="(groupAdmin, index) in showGroupAdminsName"
              >
                {{ index + 1 }}- {{ groupAdmin }}
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="seeGroupMatesModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel2">
              The Group Mates
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <button
                class="list-group-item list-group-action"
                v-for="(groupMate, index) in showGroupMatesNames"
              >
                {{ index + 1 }}- {{ groupMate }}
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
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
const userId = ref(localStorage.getItem("UserID"));
const theCreaterName = ref("");
const showGroupDetails = ref([]);
const showGroupMatesNames = ref([]);
const showGroupAdminsName = ref([]);

const getGroupMessageDetails = async () => {
  const groupId = route.params.id;

  const response = await fetch(
    `http://localhost:3000/getGroupDetails/${groupId}`
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showGroupDetails.value.push(data.groupDetails);

    for (let i = 0; i < data.groupDetails.theGroupMates.length; i++) {
      const response = await fetch(
        `http://localhost:3000/getUserDetails/${data.groupDetails.theGroupMates[i]}`
      );
      const dataTwo = await response.json();

      if (dataTwo.statusCode >= 200 && dataTwo.statusCode < 300) {
        showGroupMatesNames.value.push(dataTwo.userDetails.username);
      }
    }

    for (let i = 0; i < data.groupDetails.theGroupAdmins.length; i++) {
      const response = await fetch(
        `http://localhost:3000/getUserDetails/${data.groupDetails.theGroupAdmins[i]}`
      );
      const dataThree = await response.json();

      if (dataThree.statusCode >= 200 && dataThree.statusCode < 300) {
        showGroupAdminsName.value.push(dataThree.userDetails.username);
      }
    }
  }
};

const getTheCreaterName = async () => {
  const response = await fetch(
    `http://localhost:3000/getUserDetails/${showGroupDetails.value[0].theCreater}`
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    theCreaterName.value = data.userDetails.username;
  }
};

const leaveGroup = async () => {
  const groupId = route.params.id;

  const response = await fetch(
    `http://localhost:3000/leaveGroup/${userId.value}/${groupId}`
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
      router.push({ name: "Login" });
      localStorage.clear();
    }
  } else {
    router.push({ name: "Login" });
    localStorage.clear();
  }
};

setInterval(checkTheAuth, 10000);
setTimeout(getGroupMessageDetails, 30);
setTimeout(getTheCreaterName, 50);
</script>
