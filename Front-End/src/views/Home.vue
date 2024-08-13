<template>
  <div
    class="h-100 text-white text-sm-start"
    style="background-image: linear-gradient(to bottom, white, gray)"
  >
    <div
      class="d-flex flex-row align-items-center justify-content-center position-absolute h-100 w-100 bottom-0"
    >
      <div
        class="container-fluid shadow col-3 border-end border-black d-flex flex-column justify-content-start align-items-center h-100 p-2 mb-1"
        style="width: 25%"
        id="friendsBar"
      >
        <div
          class="w-100 d-flex flex-column justify-content-center align-items-center text-black px-2 mt-4"
        >
          <h2 class="text-center w-100 ms-1 mt-1 mb-0">Abouda Chat</h2>
        </div>
        <hr class="text-black w-100" />
        <div
          class="w-100 mb-1 d-flex flex-column justify-content-center align-items-center"
        >
          <h3 class="text-black">Chats</h3>
          <div
            class="w-100 d-flex flex-row justify-content-center align-items-center"
          >
            <button
              class="btn btn-outline-secondary me-2"
              data-bs-toggle="modal"
              data-bs-target="#addNewFriendModal"
            >
              <i class="bi bi-plus"></i>
            </button>
            <input
              type="text"
              v-model="chatSearch"
              class="form-control w-75"
              placeholder="Search Chat"
            />
          </div>
        </div>

        <hr class="w-100 text-black" />

        <transition-group
          :css="false"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
          tag="div"
          class="h-50 w-100 d-flex flex-column justify-content-start align-items-start overflow-y-auto overflow-x-hidden"
        >
          <transition name="fadeError">
            <h2
              class="text-black h4 w-100 text-center"
              v-show="showNotFoundFriends"
            >
              Not Found
            </h2>
          </transition>
          <div
            class="h-auto w-100 d-flex flex-row justify-content-between align-items-center mt-2 px-2 text-black"
            v-for="friend in computedFriendsInDOM"
          >
            <div
              class="d-none d-lg-flex flex-row justify-content-between align-items-center w-100 text-black"
              v-if="friend.friendConnections == true"
            >
              <button
                class="w-75 btn btn-outline-success me-2"
                @click="chatThisUser(friend.friendName, friend.friendId)"
              >
                {{ friend.friendName }}
              </button>
              <div
                class="d-flex flex-row justify-content-center align-items-center btn-group"
              >
                <button
                  class="btn btn-outline-danger"
                  @click="deleteFriend(friend.friendId)"
                >
                  <i class="bi bi-trash h5 mb-0"></i>
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="seeFriendInfo(friend.friendId)"
                >
                  <i class="bi bi-info-circle h5 mb-0"></i>
                </button>
              </div>
            </div>
            <div
              class="d-none d-lg-flex flex-row justify-content-between align-items-center w-100 text-black"
              v-else="friend.friendConnections == false"
            >
              <button
                class="w-75 btn btn-outline-danger me-2"
                @click="chatThisUser(friend.friendName, friend.friendId)"
              >
                {{ friend.friendName }}
              </button>
              <div
                class="d-flex flex-row justify-content-center align-items-center btn-group"
              >
                <button
                  class="btn btn-outline-danger"
                  @click="deleteFriend(friend.friendId)"
                >
                  <i class="bi bi-trash h5 mb-0"></i>
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="seeFriendInfo(friend.friendId)"
                >
                  <i class="bi bi-info-circle h5 mb-0"></i>
                </button>
              </div>
            </div>
            <div
              class="d-flex d-lg-none flex-row justify-content-between align-items-center w-100 text-black"
              v-if="friend.friendConnections == true"
            >
              <button
                class="w-75 btn btn-outline-success me-2"
                @click="chatAndGoToTheChat(friend.friendName, friend.friendId)"
              >
                {{ friend.friendName }}
              </button>
              <div
                class="d-flex flex-row justify-content-center align-items-center btn-group"
              >
                <button
                  class="btn btn-outline-danger"
                  @click="deleteFriend(friend.friendId)"
                >
                  <i class="bi bi-trash h5 mb-0"></i>
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="seeFriendInfo(friend.friendId)"
                >
                  <i class="bi bi-info-circle h5 mb-0"></i>
                </button>
              </div>
            </div>
            <div
              class="d-flex d-lg-none flex-row justify-content-between align-items-center w-100 text-black"
              v-else="friend.friendConnections == false"
            >
              <button
                class="w-75 btn btn-outline-danger me-2"
                @click="chatAndGoToTheChat(friend.friendName, friend.friendId)"
              >
                {{ friend.friendName }}
              </button>
              <div
                class="d-flex flex-row justify-content-center align-items-center btn-group"
              >
                <button
                  class="btn btn-outline-danger"
                  @click="deleteFriend(friend.friendId)"
                >
                  <i class="bi bi-trash h5 mb-0"></i>
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="seeFriendInfo(friend.friendId)"
                >
                  <i class="bi bi-info-circle h5 mb-0"></i>
                </button>
              </div>
            </div>
          </div>
        </transition-group>

        <hr class="text-black w-100" />

        <div
          class="w-100 mb-1 d-flex flex-column justify-content-center align-items-center"
        >
          <h3 class="text-black">Groups</h3>
          <div
            class="w-100 d-flex flex-row justify-content-center align-items-center"
          >
            <button
              class="btn btn-outline-secondary me-2"
              data-bs-toggle="modal"
              data-bs-target="#addNewGroupModal"
            >
              <i class="bi bi-plus"></i>
            </button>
            <input
              type="text"
              v-model="groupSearch"
              class="form-control w-75"
              placeholder="Search Group"
            />
          </div>
        </div>

        <hr class="w-100 text-black" />

        <transition-group
          :css="false"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
          tag="div"
          class="h-50 w-100 d-flex flex-column justify-content-start align-items-start overflow-y-auto overflow-x-hidden"
        >
          <transition name="notFound">
            <h2
              class="text-black h4 w-100 text-center"
              v-show="showNotFoundGroups"
            >
              Not Found
            </h2>
          </transition>
          <div
            class="h-auto w-100 d-flex flex-row justify-content-between align-items-center mt-2 px-2 text-black"
            v-for="group in computedGroupsInDOM"
          >
            <div
              class="d-none d-lg-flex flex-row justify-content-between align-items-center w-100 text-black"
            >
              <button
                class="btn btn-outline-secondary w-75 me-2"
                style="cursor: pointer"
                @click="chatThisGroup(group.groupName, group.groupId)"
              >
                {{ group.groupName }}
              </button>
              <button
                class="btn btn-outline-secondary"
                data-bs-toggle="dropdown"
                data-bs-target="#groupSettingsMenu"
              >
                <i class="bi bi-gear h5 mb-0"></i>
              </button>
              <div class="dropdown-menu" id="groupSettingsMenu">
                <a
                  v-if="group.groupCreater == userId"
                  class="dropdown-item text-danger"
                  @click="deleteGroup(group.groupId)"
                  href="#"
                >
                  Delete Group
                </a>
                <hr
                  class="dropdown-divider"
                  v-if="group.groupCreater == userId"
                />
                <a
                  class="dropdown-item"
                  @click="seeGroupInfo(group.groupId)"
                  href="#"
                >
                  See Group Info
                </a>
                <a
                  @click="editGroupSettings(group.groupId)"
                  class="dropdown-item"
                  href="#"
                >
                  Edit Group Settings
                </a>
              </div>
            </div>
            <div
              class="d-flex d-lg-none flex-row justify-content-between align-items-center w-100 text-black"
            >
              <button
                class="btn btn-outline-secondary w-75"
                style="cursor: pointer"
                @click="chatGroupAndGoToChat(group.groupName, group.groupId)"
              >
                {{ group.groupName }}
              </button>
              <button
                class="btn btn-outline-success"
                data-bs-toggle="dropdown"
                data-bs-target="#groupSettingsMenu"
              >
                <i class="bi bi-gear h5 mb-0"></i>
              </button>
              <div class="dropdown-menu" id="groupSettingsMenu">
                <a
                  v-if="group.groupCreater == userId"
                  class="dropdown-item text-danger"
                  @click="deleteGroup(group.groupId)"
                  href="#"
                >
                  Delete Group
                </a>
                <hr
                  class="dropdown-divider"
                  v-if="group.groupCreater == userId"
                />
                <a
                  class="dropdown-item"
                  @click="seeGroupInfo(group.groupId)"
                  href="#"
                >
                  See Group Info
                </a>
                <a
                  @click="editGroupSettings(group.groupId)"
                  class="dropdown-item"
                  href="#"
                >
                  Edit Group Settings
                </a>
              </div>
            </div>
          </div>
        </transition-group>

        <hr class="w-100 text-black" />

        <div
          class="pb-3 d-flex flex-row justify-content-between align-items-center w-100"
        >
          <div
            class="d-flex flex-row justify-content-center align-items-center"
          >
            <router-link
              :to="{ path: '/account' }"
              class="btn btn-outline-secondary"
              ><i class="bi bi-person-circle fs-4"></i
            ></router-link>
            <h5 class="text-black ms-2 mb-0">{{ userName }}</h5>
          </div>
          <button class="btn btn-outline-danger me-2" @click="logout">
            Logout
          </button>
        </div>
      </div>

      <div
        class="container-fluid rounded col-9 d-none d-lg-flex flex-column justify-content-between align-items-center text-center text-black h-100 p-2 my-3 w-75"
      >
        <div class="w-100 mt-3">
          <h2 v-if="sendToWho" class="mt-1 mb-0">{{ sendToWho }}</h2>
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
                    path:
                      '/editMessage/' + message.id + '/' + message.theMessage,
                  }"
                >
                  Edit
                </router-link>
                <router-link
                  class="btn btn-outline-secondary d-md-none d-block mb-1"
                  :to="{
                    path:
                      '/editMessage/' + message.id + '/' + message.theMessage,
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
                    path:
                      '/editMessage/' + message.id + '/' + message.theMessage,
                  }"
                >
                  Edit
                </router-link>
                <router-link
                  class="btn btn-outline-secondary d-md-none d-block mb-1"
                  :to="{
                    path:
                      '/editMessage/' + message.id + '/' + message.theMessage,
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
          <button class="btn btn-dark ms-1" @click="sendEmojis">
            <i class="bi bi-emoji-smile fs-5"></i>
          </button>

          <transition name="fadeEmojiCard">
            <div
              class="bg-white border border-secondary rounded w-25 mh-100 d-flex flex-column justify-content-start align-items-start position-absolute p-2"
              style="bottom: 7.5%; right: 4%; height: 25%"
              v-if="sendEmoji"
            >
              <div
                class="w-100 d-flex flex-row justify-content-end align-items-center px-2 mt-2"
              >
                <!-- <input
                  type="text"
                  placeholder="Search Emoji"
                  v-model="emojiSearch"
                  class="form-control w-75"
                /> -->
                <button
                  class="btn-close"
                  aria-label="Close"
                  @click="sendEmojis"
                ></button>
              </div>
              <hr class="w-100 text-black" />
              <div
                class="d-flex flex-row justify-content-start align-items-start w-100 overflow-x-hidden overflow-y-auto ps-1"
                style="flex-wrap: wrap"
              >
                <button
                  v-if="showEmojisInDOM.length > 0"
                  class="btn btn-outline-secondary btn-sm"
                  @click="addEmoji(emoji)"
                  v-for="emoji in showEmojisInDOM"
                >
                  {{ emoji }}
                </button>
              </div>
            </div>
          </transition>

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
    </div>

    <div
      class="modal fade"
      id="addNewFriendModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel1">
              Create New Chat
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <transition name="fadeError">
              <div
                class="alert alert-danger"
                role="alert"
                v-show="showErrorForAddNewFriend"
              >
                {{ errorForAddNewFriend }}
              </div>
            </transition>
            <transition name="fadeError">
              <div
                class="alert alert-danger"
                role="alert"
                v-show="showErrorForDuplicateFriend"
              >
                {{ errorForDuplicateFriend }}
              </div>
            </transition>

            <input
              @keyup.enter="addNewFriend"
              type="text"
              v-model="newUser"
              class="form-control mb-1"
              placeholder="Enter Friend's Name, Enter At Least 3 Characters"
            />
            <transition-group
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
              tag="div"
              class="list-group mt-2 overflow-x-hidden overflow-y-auto mh-25"
              v-if="showChatNamesInDOM.length > 0"
            >
              <button
                v-for="chatName in showChatNamesInDOM"
                class="list-group-item list-group-action"
                @click="selectNewChatFromSugg(chatName)"
              >
                {{ chatName }}
              </button>
            </transition-group>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <buttom
              type="button"
              class="btn btn-secondary"
              @click="addNewFriend"
            >
              Create
            </buttom>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="addNewGroupModal"
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
              Create New Group
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <transition name="fadeError">
              <div
                class="alert alert-danger"
                role="alert"
                v-show="showErrorForGroupName"
              >
                {{ errorForGroupName }}
              </div>
            </transition>

            <transition name="fadeError">
              <div
                class="alert alert-danger"
                role="alert"
                v-show="showErrorForGroupMates"
              >
                {{ errorForGroupMates }}
              </div>
            </transition>

            <div
              class="form-check d-flex flex-row justify-content-start align-items-center w-100 mb-2 text-black mh-25 overflow-x-hidden overflow-y-auto"
              v-for="friend in showFriendsInDOM"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="friend.friendName"
                v-model="selectedFriendForNewGroup"
                id="friendName"
              />
              <label class="form-check-label ms-1" for="friendName">
                {{ friend.friendName }}
              </label>
            </div>
            <hr class="text-black w-100" />
            <input
              @keyup.enter="addNewGroup"
              type="text"
              v-model="groupName"
              class="form-control"
              placeholder="Enter Group Name"
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
            <buttom
              type="button"
              class="btn btn-secondary"
              @click="addNewGroup"
            >
              Create
            </buttom>
            <transition name="fadeSpinner">
              <div
                class="spinner-border text-secondary position-absolute top-50 end-50"
                role="status"
                v-show="showLoading"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </transition>
          </div>
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
    <transition
      name="slideFromTop"
      class="w-100 d-flex flex-row justify-content-center align-items-center position-absolute bg-danger p-3"
    >
      <div
        v-if="showErrorForGroupAdmin"
        class="d-flex justify-content-center align-items-center"
      >
        <h3>{{ errorForGroupAdmin }}</h3>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const router = useRouter();
const userName = ref(localStorage.getItem("UserName"));
const userId = ref(localStorage.getItem("UserID"));
const userMessage = ref("");
const userMessageToGroup = ref("");
const newUser = ref("");
const showUserModal = ref(false);
const showLoading = ref(false);
const showRequestLoading = ref(false);
const sendToWho = ref("");
const showErrorForAddNewFriend = ref(false);
const errorForAddNewFriend = ref("");
const showErrorForGroupName = ref(false);
const errorForGroupName = ref("");
const showErrorForGroupMates = ref(false);
const errorForGroupMates = ref("");
const showErrorForGroupAdmin = ref(false);
const errorForGroupAdmin = ref("");
const userConnected = ref(true);
const chatMood = ref(false);
const groupMood = ref(false);
const sendEmoji = ref(false);
const showNotFoundFriends = ref(false);
const showNotFoundGroups = ref(false);
const showErrorForDuplicateFriend = ref(false);
const errorForDuplicateFriend = ref("");
const chatSearch = ref("");
const groupSearch = ref("");
const emojiSearch = ref("");
const groupName = ref("");
const selectedFriendForNewGroup = ref([userName.value]);
const showGroupsInDOM = ref([]);
const showGroupsMessagesInDOM = ref([]);
const showMessagesInDOM = ref([]);
const showFriendsInDOM = ref([]);
const showChatNamesInDOM = ref([]);
const showEmojisInDOM = ref([]);
const userMessages = [];
const userFriends = [];

if (localStorage.getItem("Mood") == "Chat") {
  chatMood.value = true;
  groupMood.value = false;
} else if (localStorage.getItem("Mood") == "Group") {
  groupMood.value = true;
  chatMood.value = false;
}

const sendEmojis = () => {
  sendEmoji.value = !sendEmoji.value;
};

const seeFriendInfo = (friendId) => {
  router.push({ path: "/friendDetails/" + friendId });
};

const seeGroupInfo = (groupId) => {
  router.push({ path: "/groupDetails/" + groupId });
};

const computedFriendsInDOM = computed(() => {
  return showFriendsInDOM.value.filter((friend) =>
    friend.friendName.toLowerCase().includes(chatSearch.value)
  );
});

const computedGroupsInDOM = computed(() => {
  return showGroupsInDOM.value.filter((group) =>
    group.groupName.toLowerCase().includes(groupSearch.value)
  );
});

setInterval(() => {
  if (computedFriendsInDOM.value.length == 0) {
    showNotFoundFriends.value = true;
  }
  if (computedGroupsInDOM.value.length == 0) {
    showNotFoundGroups.value = true;
  }
}, 10);

setInterval(() => {
  if (computedFriendsInDOM.value.length > 0) {
    showNotFoundFriends.value = false;
  }
  if (computedGroupsInDOM.value.length > 0) {
    showNotFoundGroups.value = false;
  }
}, 10);

const selectNewChatFromSugg = (chatName) => {
  newUser.value = chatName;
};

watch(newUser, async (newChatName, oldChatName) => {
  if (newChatName.length > 2) {
    const response = await fetch(
      `http://localhost:3000/getChatName/${newUser.value.toLowerCase()}`
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      for (let i = 0; i < data.chatNames.length; i++) {
        if (
          showChatNamesInDOM.value.includes(data.chatNames[i].username) == false
        ) {
          showChatNamesInDOM.value.push(data.chatNames[i].username);
        }
      }
    }
  } else {
    showChatNamesInDOM.value = [];
  }
});

const chatThisUser = (friendName, friendId) => {
  sendToWho.value = friendName;
  localStorage.setItem("LastChater", friendName);
  localStorage.setItem("LastChaterId", friendId);
  localStorage.setItem("Mood", "Chat");

  setTimeout(() => {
    window.location.reload();
  }, 10);
};

const chatAndGoToTheChat = (friendName, friendId) => {
  localStorage.setItem("LastChater", friendName);
  localStorage.setItem("LastChaterId", friendId);
  localStorage.setItem("mobileChat", true);
  localStorage.setItem("Mood", "Chat");

  router.push({ path: "/chat" });
  setTimeout(() => {
    window.location.reload();
  }, 10);
};

const chatThisGroup = (groupName, groupId) => {
  sendToWho.value = groupName;
  localStorage.setItem("LastChater", groupName);
  localStorage.setItem("LastChaterId", groupId);
  localStorage.setItem("Mood", "Group");

  setTimeout(() => {
    window.location.reload();
  }, 10);
};

const chatGroupAndGoToChat = (groupName, groupId) => {
  sendToWho.value = groupName;
  localStorage.setItem("LastChater", groupName);
  localStorage.setItem("LastChaterId", groupId);
  localStorage.setItem("mobileChat", true);
  localStorage.setItem("Mood", "Group");

  router.push({ path: "/chat" });
  setTimeout(() => {
    window.location.reload();
  }, 10);
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

const addEmoji = (theEmoji) => {
  userMessage.value += theEmoji;
};

const getTheEmojis = async () => {
  // const response = await fetch("http://localhost:3000/getEmojis");
  // const data = await response.json();
  // if (data.statusCode >= 200 && data.statusCode < 300) {
  //   for (let i = 0; i < data.allEmojis.length; i++) {
  //     showEmojisInDOM.value.push(data.allEmojis[i].character);
  //   }
  // }
};

const addNewFriend = async () => {
  if (newUser.value != "") {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newFriendForId: userId.value,
        newFriendName: newUser.value.toLowerCase(),
      }),
    };

    const reqResponse = await fetch(
      "http://localhost:3000/addNewFriend",
      requestOptions
    );
    const response = await reqResponse.json();
    if (response.statusCode >= 200 && response.statusCode < 300) {
      newUser.value = "";
      showUserModal.value = false;
      setTimeout(() => {
        window.location.reload();
      }, 10);
    } else {
      newUser.value = "";
      showErrorForAddNewFriend.value = true;
      errorForAddNewFriend.value = response.errorMessage;
      setTimeout(() => {
        showErrorForAddNewFriend.value = false;
      }, 3000);
    }
  } else {
    newUser.value = "";
    showErrorForAddNewFriend.value = true;
    errorForAddNewFriend.value = "Please Enter Friend's Name";
    setTimeout(() => {
      showErrorForAddNewFriend.value = false;
    }, 3000);
  }
  newUser.value = "";
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

  showNotFoundFriends.value = false;
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
      sendToWho.value = localStorage.getItem("LastChater");

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
        userFriends.push(data.friendName);
      }
    }
  }
};

const deleteFriend = async (friendId) => {
  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      friendId: friendId,
      whoFriendId: userId.value,
    }),
  };

  showRequestLoading.value = true;
  const response = await fetch(
    "http://localhost:3000/deleteFriend",
    requestOptions
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showRequestLoading.value = false;
    if (localStorage.getItem("LastChaterId") == friendId) {
      localStorage.removeItem("LastChater");
      localStorage.removeItem("LastChaterId");
    }
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
};

const sendTheMessage = async () => {
  if (
    userMessage.value != "" &&
    sendToWho.value != "" &&
    localStorage.getItem("Mood") == "Chat"
  ) {
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

    showRequestLoading.value = true;
    const response = await fetch(
      "http://localhost:3000/addNewMessage",
      requestOptions
    );
    const data = await response.json();
    if (data.statusCode >= 200 && data.statusCode < 300) {
      showRequestLoading.value = false;
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

const addNewGroup = async () => {
  if (groupName.value != "") {
    if (selectedFriendForNewGroup.value.length > 1) {
      if (selectedFriendForNewGroup.value.length == 2) {
        showErrorForGroupMates.value = true;
        errorForGroupMates.value = "The Group Mates Must Be At Least 3";
        setTimeout(() => {
          showErrorForGroupMates.value = false;
        }, 3000);
      } else {
        const requestOptions = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theGroupName: groupName.value,
            theCreater: userId.value,
            theGroupMates: selectedFriendForNewGroup.value,
          }),
        };
        showLoading.value = true;
        const response = await fetch(
          "http://localhost:3000/addNewGroup",
          requestOptions
        );
        const data = await response.json();
        if (data.statusCode >= 200 && data.statusCode < 300) {
          showLoading.value = false;
          groupName.value = "";
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
      }
    } else {
      showErrorForGroupMates.value = true;
      errorForGroupMates.value = "Please Select Some Group Mates";
      setTimeout(() => {
        showErrorForGroupMates.value = false;
      }, 3000);
    }
  } else {
    showErrorForGroupName.value = true;
    errorForGroupName.value = "Please Enter A Name For The Group";
    setTimeout(() => {
      showErrorForGroupName.value = false;
    }, 3000);
  }
};

const getYourGroups = async () => {
  showNotFoundGroups.value = false;
  const response = await fetch(
    "http://localhost:3000/getGroups/" + userId.value
  );
  const data = await response.json();

  if (data.statusCode >= 200 && data.statusCode < 300) {
    for (let i = 0; i < data.yourGroups.length; i++) {
      showGroupsInDOM.value.push({
        groupName: data.yourGroups[i].theGroupName,
        groupId: data.yourGroups[i].id,
        groupCreater: data.yourGroups[i].theCreater,
      });
    }
  }
};

const editGroupSettings = async (groupId) => {
  let checkIsAdmin;
  const response = await fetch(
    `http://localhost:3000/getGroupDetails/${groupId}`
  );
  const data = await response.json();

  if (data.statusCode >= 200 && data.statusCode < 300) {
    for (let i = 0; i < data.groupDetails.theGroupAdmins.length; i++) {
      if (userId.value == data.groupDetails.theGroupAdmins[i]) {
        router.push({ path: `/groupSettings/${groupId}` });
        break;
      } else {
        showErrorForGroupAdmin.value = true;
        errorForGroupAdmin.value = "You are not an admin";
        setTimeout(() => {
          showErrorForGroupAdmin.value = false;
        }, 3000);
      }
    }
  }
};

const deleteGroup = async (groupId) => {
  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupId: groupId,
    }),
  };

  showRequestLoading.value = true;
  const response = await fetch(
    "http://localhost:3000/deleteGroup",
    requestOptions
  );
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    showRequestLoading.value = false;
    if (sendToWho.value == localStorage.getItem("LastChater")) {
      localStorage.removeItem("LastChater");
      localStorage.removeItem("LastChaterId");
      setTimeout(() => {
        window.location.reload();
      }, 10);
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
      router.push({ name: "Login" });
      localStorage.clear();
    }
  } else {
    router.push({ name: "Login" });
    localStorage.clear();
  }
};

const logout = async () => {
  const requestOptions = {
    method: "PATCH",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID: userId.value,
    }),
  };
  const response = await fetch("http://localhost:3000/logout", requestOptions);
  const data = await response.json();
  if (data.statusCode >= 200 && data.statusCode < 300) {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("LastChater");
    localStorage.removeItem("LastChaterId");
    router.push({ path: "/login" });
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
};

const checkTheUserConnection = async () => {
  const userConnection = window.navigator.onLine;
  const requestOptions = {
    method: "PATCH",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID: userId.value,
      connectionType: userConnection,
    }),
  };

  const reqResponse = await fetch(
    "http://localhost:3000/checkTheUserConnection",
    requestOptions
  );
  const response = await reqResponse.json();
  if (response.statusCode >= 200 && response.statusCode < 300) {
    userConnected.value = true;
  } else {
    userConnected.value = false;
  }
};

const checkTheChaterExist = () => {
  const LastChater = localStorage.getItem("LastChater");
  const theMood = localStorage.getItem("Mood");

  if (theMood == "Chat" && sendToWho.value != "" && LastChater != "") {
    for (let i = 0; i < showFriendsInDOM.value.length; i++) {
      if (LastChater != showFriendsInDOM.value[i].friendName) {
        sendToWho.value = "";
        localStorage.removeItem("LastChater");
        localStorage.removeItem("LastChaterId");
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }
    }
  } else if (theMood == "Group" && sendToWho.value != "" && LastChater != "") {
    for (let i = 0; i < showGroupsInDOM.value.length; i++) {
      if (LastChater != showGroupsInDOM.value[i].groupName) {
        sendToWho.value = "";
        localStorage.removeItem("LastChater");
        localStorage.removeItem("LastChaterId");
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }
    }
  }
};

const onBeforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.height = 0;
};

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
};

setInterval(checkTheAuth, 10000);
setInterval(checkTheNewMessages, 1000);
getTheChater();
getYourFriends();
getYourGroups();
getYourMessagesWithYourFriend();
getYourGroupsMessages();
checkTheUserConnection();

setInterval(() => {
  localStorage.removeItem("SelectedMessageForDelete");
  localStorage.removeItem("SelectedGroupMessageForDelete");
}, 25000);
</script>

<style>
.fadeError-enter-from {
  opacity: 0;
}

.fadeError-enter-to {
  opacity: 1;
}

.fadeError-enter-active,
.fadeError-leave-active {
  transition: all 0.7s ease;
}

.fadeError-leave-from {
  opacity: 1;
}

.fadeError-leave-to {
  opacity: 0;
}

.fadeSpinner-enter-from {
  opacity: 0;
}

.fadeSpinner-enter-to {
  opacity: 1;
}

.fadeSpinner-enter-active,
.fadeSpinner-leave-active {
  transition: all 0.7s ease;
}

.fadeSpinner-leave-from {
  opacity: 1;
}

.fadeSpinner-leave-to {
  opacity: 0;
}

.slideFromTop-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.slideFromTop-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slideFromTop-enter-active {
  transition: all 0.7s ease;
}

.slideFromTop-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slideFromTop-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.slideFromTop-leave-active {
  transition: all 0.7s ease;
}

.fadeEmojiCard-enter-from {
  opacity: 0;
}

.fadeEmojiCard-enter-to {
  opacity: 1;
}

.fadeEmojiCard-enter-active {
  transition: all 0.7s ease;
}

.fadeEmojiCard-leave-from {
  opacity: 1;
}

.fadeEmojiCard-leave-to {
  opacity: 0;
}

.fadeEmojiCard-leave-active {
  transition: all 0.7s ease;
}

.notFound-enter-from {
  opacity: 0;
}

.notFound-enter-to {
  opacity: 1;
}

.notFound-enter-active {
  transition: all 0.7s ease;
}

.notFound-leave-from {
  opacity: 1;
}

.notFound-leave-to {
  opacity: 0;
}

.notFound-leave-active {
  transition: all 0.7s ease;
}

@media only screen and (max-width: 991px) {
  #friendsBar {
    width: 100% !important;
  }
}
</style>
