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
        >
          <button
            class="btn btn-secondary my-3"
            data-bs-toggle="modal"
            data-bs-target="#changeGroupNameModal"
          >
            Change The Group Name
          </button>

          <button
            data-bs-toggle="modal"
            data-bs-target="#seeGroupMatesModal"
            class="btn btn-secondary mt-1"
          >
            See The Group Mates
          </button>
          <button
            class="btn btn-secondary mt-1 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#editGroupMatesModal"
          >
            Add Or Delete Group Mates
          </button>

          <button
            data-bs-toggle="modal"
            data-bs-target="#seeGroupAdminsModal"
            class="btn btn-secondary mt-1"
          >
            See The Group Admins
          </button>
          <button
            class="btn btn-secondary mt-1"
            data-bs-toggle="modal"
            data-bs-target="#editGroupAdminsModal"
          >
            Add Or Delete Group Admins
          </button>

          <button @click="editGroupSettings" class="btn btn-secondary mt-3">
            Edit
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
              v-for="(groupMate, index) in showGroupMatesNamesInDOM"
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
              v-for="(groupAdmin, index) in showGroupAdminsNamesInDOM"
            >
              <li class="list-group-item">{{ index + 1 }}- {{ groupAdmin }}</li>
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
      id="editGroupMatesModal"
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
              Add New Group Mates
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex flex-row justify-content-around align-items-center w-100 mb-1"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioForGroupMate"
                  ref="addGroupMate"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Add A Friend
                </label>
              </div>
              <div class="vr"></div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioForGroupMate"
                  ref="deleteGroupMate"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Delete A Friend
                </label>
              </div>
            </div>
            <hr />
            <div
              class="d-flex flex-row justify-content-start align-items-center w-100 text-black form-check"
              v-for="friend in showFriendsInDOM"
            >
              <input
                type="checkbox"
                class="form-check-input"
                :value="friend.friendName"
                id="friendName"
                v-model="theNewGroupMates"
              />
              <label for="friendName" class="ms-1 form-check-label">{{
                friend.friendName
              }}</label>
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
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editGroupAdminsModal"
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
              Add New Group Admins
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex flex-row justify-content-around align-items-center w-100 mb-1"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioForGroupAdmin"
                  ref="addGroupAdmin"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Add An Admin
                </label>
              </div>
              <div class="vr"></div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioForGroupAdmin"
                  ref="deleteGroupAdmin"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Delete An Admin
                </label>
              </div>
            </div>
            <hr />
            <div
              class="d-flex flex-row justify-content-start align-items-center w-100 text-black form-check"
              v-for="friend in showFriendsInDOM"
            >
              <input
                type="checkbox"
                class="form-check-input"
                :value="friend.friendName"
                id="friendName"
                v-model="theNewGroupAdmins"
              />
              <label for="friendName" class="ms-1 form-check-label">{{
                friend.friendName
              }}</label>
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
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="changeGroupNameModal"
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
              Change Group Name
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-for="groupDetail in showGroupDetailsInDOM">
            <p class="fs-5 mt-1 text-center">
              Group Name: {{ groupDetail.theGroupName }}
            </p>
            <hr class="w-100 text-black" />
            <label class="fs-5 mt-1 text-center form-label w-100"
              >The New Group Name:</label
            >
            <input
              type="text"
              class="form-control"
              v-model="theNewGroupName"
              placeholder="Enter The New Group Name"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition
      name="slideFromTop"
      class="w-100 d-flex flex-row justify-content-center align-items-center position-absolute bg-danger bg-gradient p-3 top-0"
    >
      <div
        v-if="showErrorToast"
        class="d-flex flex-row justify-content-center align-items-center"
      >
        <h3 class="text-white">{{ errorText }}</h3>
      </div>
    </transition>
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
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const userId = ref(localStorage.getItem("UserID"));
const userName = ref(localStorage.getItem("UserName"));
const showGroupDetailsInDOM = ref([]);
const showGroupMatesNamesInDOM = ref([]);
const showGroupAdminsNamesInDOM = ref([]);
const showFriendsInDOM = ref([]);
const theNewGroupMates = ref([userName.value]);
const theNewGroupAdmins = ref([userName.value]);
const theNewGroupName = ref("");
const showErrorToast = ref(false);
const errorText = ref("");
const deleteGroupMate = ref(null);
const deleteGroupAdmin = ref(null);
const addGroupAdmin = ref(null);
const addGroupMate = ref(null);
const showRequestLoading = ref(false);

const editGroupSettings = async () => {
  const groupId = route.params.id;

  if (theNewGroupMates.value.length > 1 && theNewGroupName.value != "") {
    const requestOptions = {
      method: "PATCH",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theNewGroupName: theNewGroupName.value,
        theNewGroupMates: theNewGroupMates.value,
        theNewGroupAdmins: theNewGroupAdmins.value,
      }),
    };

    showRequestLoading.value = true;
    const response = await fetch(
      `http://localhost:3000/editGroupSettings/${userId.value}/${groupId}`,
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      showRequestLoading.value = false;
      router.push({ path: "/" });

      setTimeout(() => {
        window.location.reload();
      }, 10);
    } else {
      showErrorToast.value = true;
      errorText.value = data.errorMessage;

      setTimeout(() => {
        showErrorToast.value = false;
      }, 3000);
    }
  } else {
    showErrorToast.value = true;
    errorText.value = "You didn't choose any group admins or group mates";
    setTimeout(() => {
      showErrorToast.value = false;
    }, 3000);
  }
};

const getGroupDetails = async () => {
  const groupId = route.params.id;

  const response = await fetch(
    `http://localhost:3000/getGroupDetails/${groupId}`
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showGroupDetailsInDOM.value.push(data.groupDetails);

    for (let i = 0; i < data.groupDetails.theGroupMates.length; i++) {
      const response = await fetch(
        `http://localhost:3000/getUserDetails/${data.groupDetails.theGroupMates[i]}`
      );
      const dataTwo = await response.json();

      if (dataTwo.statusCode >= 200 && dataTwo.statusCode < 300) {
        showGroupMatesNamesInDOM.value.push(dataTwo.userDetails.username);
      }
    }

    for (let i = 0; i < data.groupDetails.theGroupAdmins.length; i++) {
      const response = await fetch(
        `http://localhost:3000/getUserDetails/${data.groupDetails.theGroupAdmins[i]}`
      );
      const dataTwo = await response.json();

      if (dataTwo.statusCode >= 200 && dataTwo.statusCode < 300) {
        showGroupAdminsNamesInDOM.value.push(dataTwo.userDetails.username);
      }
    }
  }
};

const getYourFriends = async () => {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId.value,
    }),
  };

  const reqResponse = await fetch(
    "http://localhost:3000/getFriends",
    requestOptions
  );
  const response = await reqResponse.json();
  if (response.statusCode >= 200 && response.statusCode < 300) {
    const myFriends = response.yourFriends;
    for (let i = 0; i < myFriends.length; i++) {
      const responseReq = await fetch(
        "http://localhost:3000/getUserDetails/" + myFriends[i].NewFriendNameId
      );
      const secondResponse = await responseReq.json();

      const response = await fetch(
        "http://localhost:3000/getFriendName/" + myFriends[i].NewFriendNameId
      );
      const data = await response.json();
      if (data.statusCode >= 200 && data.statusCode < 300) {
        showFriendsInDOM.value.push({
          friendName: data.friendName,
          friendId: myFriends[i].NewFriendNameId,
          friendConnections: secondResponse.userDetails.online,
        });
      }
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
setTimeout(getGroupDetails, 30);
setTimeout(getYourFriends, 30);
</script>
