<template>
  <div
    class="h-100 text-white text-sm-start"
    style="background-image: linear-gradient(to bottom, white, gray)"
  >
    <div
      class="container-fluid rounded col-9 d-flex flex-column justify-content-between align-items-center text-center text-black h-100 p-2 mb-3 w-100"
    >
      <div class="w-100 mt-3">
        <div class="d-flex flex-row justify-content-around align-items-center">
          <button
            class="btn btn-outline-secondary position-absolute"
            style="top: 2.9%; left: 2%"
            @click="removeTheAccess"
          >
            <i class="bi bi-arrow-left"></i>
          </button>
          <h2 v-if="sendToWho" class="mt-1 mb-0">{{ sendToWho }}</h2>
        </div>
        <hr v-if="sendToWho" class="text-black w-100" />
      </div>

      <div
        class="d-flex flex-column justify-content-start align-items-start h-100 w-100 p-3 overflow-x-hidden overflow-y-auto"
        v-if="
          showMessagesInDOM.length != 0 || showGroupsMessagesInDOM.length != 0
        "
      >
        <div
          v-show="chatMood"
          v-for="message in showMessagesInDOM"
          class="mb-1 w-100 d-flex flex-row justify-content-end align-items-center"
        >
          <div
            v-if="message.fromWhoId == userId"
            class="bg-dark bg-gradient d-flex flex-row justify-content-between align-items-center text-white"
            style="
              padding: 15px 25px;
              font-size: 15px;
              border: none;
              border-radius: 8px;
              margin-right: 15%;
              margin-left: auto;
              width: 88%;
              box-sizing: border-box;
              text-align: left;
            "
          >
            <div
              class="d-flex flex-row justify-content-center align-items-center"
            >
              <h6 style="margin-bottom: 0.2rem" class="me-2">
                <router-link :to="{ path: '/messageDetails/' + message.id }"
                  ><i class="bi bi-info-circle text-white"></i
                ></router-link>
              </h6>
              <h6 style="margin-bottom: 0.2rem">
                {{ message.theMessage }}
              </h6>
            </div>
            <div
              class="d-flex flex-md-row flex-column justify-content-around align-items-center ms-2"
              style="box-sizing: border-box"
            >
              <span class="d-block d-md-none">{{ message.messageTime }}</span>
              <span class="d-none d-md-block me-2">{{
                message.messageTime
              }}</span>
              <router-link
                class="btn btn-outline-secondary d-none d-md-block me-2"
                :to="{
                  path: '/editMessage/' + message.id + '/' + message.theMessage,
                }"
              >
                Edit
              </router-link>
              <router-link
                class="btn btn-outline-secondary d-md-none d-block mb-1"
                :to="{
                  path: '/editMessage/' + message.id + '/' + message.theMessage,
                }"
              >
                Edit
              </router-link>
              <button
                data-bs-target="#deleteModal"
                data-bs-toggle="modal"
                class="btn btn-outline-danger"
                @click="setSelectedMessageForDelete(message.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div
            v-else="message.fromWhoId != userId"
            class="bg-black bg-gradient d-flex flex-row justify-content-between align-items-center text-white"
            style="
              padding: 15px 25px;
              font-size: 15px;
              border: none;
              border-radius: 8px;
              margin-left: auto;
              width: 88%;
              box-sizing: border-box;
              text-align: left;
            "
          >
            <div
              class="d-flex flex-row justify-content-center align-items-center"
            >
              <h6 style="margin-bottom: 0.2rem" class="me-2">
                <router-link :to="{ path: '/messageDetails/' + message.id }">
                  <i class="bi bi-info-circle text-white"></i
                ></router-link>
              </h6>
              <h6 style="margin-bottom: 0.2rem">
                {{ message.theMessage }}
              </h6>
            </div>
            <span class="ms-3">{{ message.messageTime }}</span>
          </div>
          <div
            class="modal fade"
            id="deleteModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel5"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5 text-black text-center"
                    id="staticBackdropLabel5"
                  >
                    Confirm Delete
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h3 class="w-100 text-center text-danger">Are You Sure</h3>
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
                    type="button"
                    class="btn btn-danger"
                    @click="deleteMessage"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="groupMood"
          v-for="message in showGroupsMessagesInDOM"
          class="mb-1 w-100 d-flex flex-row justify-content-end align-items-center"
        >
          <div
            v-if="message.fromWhoId == userId"
            class="border border-secondary d-flex flex-row justify-content-between align-items-center text-black shadow-sm"
            style="
              padding: 15px 25px;
              font-size: 15px;
              border: none;
              border-radius: 8px;
              margin-right: 15%;
              margin-left: auto;
              width: 88%;
              box-sizing: border-box;
              text-align: left;
            "
          >
            <div
              class="d-flex flex-row justify-content-center align-items-center"
            >
              <h6 style="margin-bottom: 0.2rem" class="me-2">
                <router-link :to="{ path: '/messageDetails/' + message.id }"
                  ><i class="bi bi-info-circle text-black"></i
                ></router-link>
              </h6>
              <h6 style="margin-bottom: 0.2rem">{{ message.theMessage }}</h6>
            </div>
            <div
              class="d-flex flex-md-row flex-column justify-content-around align-items-center ms-2"
              style="box-sizing: border-box"
            >
              <span class="d-block d-md-none">{{ message.messageTime }}</span>
              <span class="d-none d-md-block me-2">{{
                message.messageTime
              }}</span>
              <router-link
                class="btn btn-outline-secondary d-none d-md-block me-2"
                :to="{
                  path: '/editMessage/' + message.id + '/' + message.theMessage,
                }"
              >
                Edit
              </router-link>
              <router-link
                class="btn btn-outline-secondary d-md-none d-block mb-1"
                :to="{
                  path: '/editMessage/' + message.id + '/' + message.theMessage,
                }"
              >
                Edit
              </router-link>
              <button
                data-bs-target="#deleteGroupMessageModal"
                data-bs-toggle="modal"
                class="btn btn-outline-danger"
                @click="setSelectedGroupMessageForDelete(message.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div
            v-else="message.fromWhoId != userId"
            class="border border-secondary d-flex flex-row justify-content-between align-items-center text-black shadow-sm"
            style="
              padding: 15px 25px;
              font-size: 15px;
              border: none;
              border-radius: 8px;
              margin-left: auto;
              width: 88%;
              box-sizing: border-box;
              text-align: left;
            "
          >
            <div
              class="d-flex flex-row justify-content-center align-items-center"
            >
              <h6 style="margin-bottom: 0.2rem" class="me-2">
                <router-link :to="{ path: '/messageDetails/' + message.id }">
                  <i class="bi bi-info-circle text-black"></i
                ></router-link>
              </h6>
              <h6 style="margin-bottom: 0.2rem">{{ message.theMessage }}</h6>
            </div>
            <span class="ms-3">{{ message.messageTime }}</span>
          </div>
          <div
            class="modal fade"
            id="deleteGroupMessageModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel4"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5 text-black text-center"
                    id="staticBackdropLabel4"
                  >
                    Confirm Delete
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h3 class="w-100 text-center text-danger">Are You Sure</h3>
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
                    type="button"
                    class="btn btn-danger"
                    @click="deleteGroupMessage"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-100 d-flex flex-row justify-content-center align-items-center form-group"
        v-if="sendToWho"
      >
        <input
          v-show="chatMood"
          @keyup.enter="sendTheMessage"
          type="text"
          v-model="userMessage"
          placeholder="Enter Your Message"
          class="form-control"
          data-bs-theme="dark"
        />
        <input
          v-show="groupMood"
          @keyup.enter="sendTheMessageToGroup"
          type="text"
          v-model="userMessageToGroup"
          placeholder="Enter Your Message"
          class="form-control"
          data-bs-theme="dark"
        />
        <button
          v-show="chatMood"
          class="w-25 btn btn-dark rounded ms-1"
          type="submit"
          @click="sendTheMessage"
        >
          <i class="bi bi-send"></i>
        </button>
        <button
          v-show="groupMood"
          class="w-25 btn btn-dark rounded ms-1"
          type="submit"
          @click="sendTheMessageToGroup"
        >
          <i class="bi bi-send"></i>
        </button>
      </div>
    </div>
    <transition name="fadeSpinner">
      <div
        class="spinner-border text-secondary position-absolute top-50 end-50"
        role="status"
        v-show="showRequestLoading"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref(localStorage.getItem("UserName"));
const userId = ref(localStorage.getItem("UserID"));
const sendToWho = ref("");
const userMessage = ref("");
const userMessageToGroup = ref("");
const showMessagesInDOM = ref([]);
const showGroupsMessagesInDOM = ref([]);
const userMessages = [];
const chatMood = ref(false);
const groupMood = ref(false);
const showRequestLoading = ref(false);

if (localStorage.getItem("Mood") == "Chat") {
  chatMood.value = true;
  groupMood.value = false;
} else if (localStorage.getItem("Mood") == "Group") {
  groupMood.value = true;
  chatMood.value = false;
}

const removeTheAccess = () => {
  localStorage.removeItem("mobileChat");
  router.push({ path: "/" });
};

const getTheChater = () => {
  if (localStorage.getItem("LastChater")) {
    sendToWho.value = localStorage.getItem("LastChater");
  }
};

const setSelectedMessageForDelete = (IDofMessage) => {
  localStorage.setItem("SelectedMessageForDelete", IDofMessage);
};

const setSelectedGroupMessageForDelete = (IDofMessage) => {
  localStorage.setItem("SelectedGroupMessageForDelete", IDofMessage);
};

const deleteMessage = async () => {
  const messageID = localStorage.getItem("SelectedMessageForDelete");

  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messageId: messageID,
      whoMessageId: userId.value,
    }),
  };

  const reqResponse = await fetch(
    "http://localhost:3000/deleteMessage",
    requestOptions
  );
  const response = await reqResponse.json();
  if (response.statusCode >= 200 && response.statusCode < 300) {
    localStorage.removeItem("SelectedMessageForDelete");
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
};

const sendTheMessage = async () => {
  if (userMessage.value != "" && sendToWho.value != "") {
    const sendToWhoId = localStorage.getItem("LastChaterId");
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromWhoId: userId.value,
        toWhoId: sendToWhoId,
        theMessage: userMessage.value,
      }),
    };

    const response = await fetch(
      "http://localhost:3000/addNewMessage",
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userMessage.value = "";
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  }
};

const getYourMessagesWithYourFriend = async () => {
  if (sendToWho.value != "") {
    const sendToWhoId = localStorage.getItem("LastChaterId");
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId.value,
        sendToWhoId: sendToWhoId,
      }),
    };

    const reqResponse = await fetch(
      "http://localhost:3000/getMessages",
      requestOptions
    );
    const response = await reqResponse.json();
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < response.yourMessages.length; i++) {
        if (
          response.yourMessages[i].fromWhoId == userId.value &&
          response.yourMessages[i].fromWhoId != sendToWhoId
        ) {
          showMessagesInDOM.value.push(response.yourMessages[i]);
          userMessages.push(response.yourMessages[i].id);
        } else if (
          response.yourMessages[i].fromWhoId != userId.value &&
          response.yourMessages[i].fromWhoId == sendToWhoId
        ) {
          showMessagesInDOM.value.push(response.yourMessages[i]);
          userMessages.push(response.yourMessages[i].id);
        }
      }
    }
  }
};

const checkTheNewMessages = async () => {
  const theMood = localStorage.getItem("Mood");
  if (theMood == "Chat") {
    if (userMessages.length >= 0 && sendToWho.value != "") {
      const sendToWhoId = localStorage.getItem("LastChaterId");
      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.value,
          sendToWhoId: sendToWhoId,
        }),
      };

      const reqResponse = await fetch(
        `http://localhost:3000/checkTheNewMessages/${theMood}`,
        requestOptions
      );
      const response = await reqResponse.json();
      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (
          response.newMessages.length > userMessages.length ||
          response.newMessages.length < userMessages.length
        ) {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      }
    }
  } else if (theMood == "Group") {
    if (showGroupsMessagesInDOM.value.length >= 0 && sendToWho.value != "") {
      const groupId = localStorage.getItem("LastChaterId");
      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: groupId,
        }),
      };

      const reqResponse = await fetch(
        `http://localhost:3000/checkTheNewMessages/${theMood}`,
        requestOptions
      );
      const response = await reqResponse.json();
      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (
          response.newMessages.length > showGroupsMessagesInDOM.value.length ||
          response.newMessages.length < showGroupsMessagesInDOM.value.length
        ) {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      }
    }
  }
};

const sendTheMessageToGroup = async () => {
  if (
    userMessageToGroup.value != "" &&
    localStorage.getItem("Mood") == "Group"
  ) {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theGroupId: localStorage.getItem("LastChaterId"),
        theMessage: userMessageToGroup.value,
        fromWhoId: userId.value,
      }),
    };

    showRequestLoading.value = true;
    const response = await fetch(
      "http://localhost:3000/addNewDataToGroup",
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userMessageToGroup.value = "";
      showRequestLoading.value = false;
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  }
};

const getYourGroupsMessages = async () => {
  if (sendToWho.value != "" && localStorage.getItem("Mood") == "Group") {
    const response = await fetch(
      "http://localhost:3000/getGroupsData/" +
        localStorage.getItem("LastChaterId")
    );
    const data = await response.json();

    if (data.statusCode >= 200 && data.statusCode < 300) {
      for (let i = 0; i < data.yourMessages.length; i++) {
        showGroupsMessagesInDOM.value.push(data.yourMessages[i]);
      }
    }
  }
};

const deleteGroupMessage = async () => {
  const messageId = localStorage.getItem("SelectedGroupMessageForDelete");

  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messageId: messageId,
      whoMessageId: userId.value,
    }),
  };

  showRequestLoading.value = true;
  const response = await fetch(
    "http://localhost:3000/deleteGroupMessage",
    requestOptions
  );
  const data = await response.json();

  if (data.statusCode >= 200 && data.statusCode < 300) {
    showRequestLoading.value = false;
    localStorage.removeItem("SelectedGroupMessageForDelete");
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
setInterval(checkTheNewMessages, 1000);
setTimeout(getYourGroupsMessages, 30);
setTimeout(getTheChater, 15);
setTimeout(getYourMessagesWithYourFriend, 30);

setInterval(() => {
  localStorage.removeItem("SelectedMessageForDelete");
}, 25000);
</script>
