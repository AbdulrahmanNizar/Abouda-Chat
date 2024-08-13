import express from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./models/UserModel.js";
import newChat from "./models/AddNewFriendModel.js";
import newMessage from "./models/AddNewChatModel.js";
import newGroup from "./models/AddNewGroupModel.js";
import newMessageInGroup from "./models/GroupDetailsModel.js";
import loggedUser from "./models/LoggedUserModel.js";

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/abouda-chat")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

let userId = 0;
let idNumberForMessages = 0;
let idNumberForGroups = 0;
let idNumberForGroupMessages = 0;

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const usersInDB = await User.find();
  let checkTheUserName = false;
  let idNumberForUser;

  if (usersInDB.length > 0) {
    for (let i = 0; i < usersInDB.length; i++) {
      if (username == usersInDB[i].username) {
        checkTheUserName = true;
      } else {
        checkTheUserName = false;
      }
    }
  }

  if (checkTheUserName == false) {
    if (usersInDB.length > 0) {
      for (let i = 0; i < usersInDB.length; i++) {
        const idNumberForUsers = Math.floor(Math.random() * 10000) + 1;
        if (usersInDB[i].id != idNumberForUsers) {
          idNumberForUser = idNumberForUsers;
        } else {
          idNumberForUsers = "";
          idNumberForUsers = Math.floor(Math.random() * 10000) + 1;
          idNumberForUser = idNumberForUsers;
        }
      }
    } else {
      idNumberForUser = Math.floor(Math.random() * 10000) + 1;
    }

    const expirein = 7 * 24 * 60 * 60;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = JWT.sign({ userId }, process.env.PRIVATE_KEY, {
      expiresIn: expirein,
    });

    const user = new User({
      id: idNumberForUser,
      username: username,
      email: email,
      password: hashedPassword,
      online: true,
      description: "Hello I'm Using Abouda Chat!",
    });

    const LoggedUser = new loggedUser({
      id: idNumberForUser,
      logged: true,
    });

    await user.save();
    await LoggedUser.save();

    userId += 1;

    return res.status(201).json({
      successMessage: "User is created successfully",
      statusCode: 201,
      token: token,
      UserID: idNumberForUser,
      userName: username,
    });
  } else {
    return res.status(400).json({
      errorMessage: "The username is already exists",
      statusCode: 400,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usersInDB = await User.find({ email: email });
  let checkTheUserName;
  let UserID;
  let userPassword;
  let userName;

  if (usersInDB.length > 0) {
    for (let i = 0; i < usersInDB.length; i++) {
      const UserId = usersInDB[i].id;
      const PassWord = usersInDB[i].password;
      const UserName = usersInDB[i].username;

      userPassword = PassWord;
      userName = UserName;
      UserID = UserId;
      checkTheUserName = true;
    }
  } else {
    checkTheUserName = false;
  }

  if (checkTheUserName === true) {
    const expirein = 7 * 24 * 60 * 60;

    const passwordCompare = await bcrypt.compare(password, userPassword);

    if (passwordCompare === false) {
      return res
        .status(404)
        .json({ errorMessage: "Wrong email or password", statusCode: 404 });
    } else {
      const token = JWT.sign({ userId }, process.env.PRIVATE_KEY, {
        expiresIn: expirein,
      });

      await loggedUser.updateOne({ id: UserID }, { $set: { logged: true } });
      await User.updateOne({ id: UserID }, { $set: { online: true } });

      userId += 1;
      return res.status(200).json({
        successMessage: "Logged in successfully",
        statusCode: 200,
        token: token,
        UserID: UserID,
        userName: userName,
      });
    }
  } else {
    return res
      .status(404)
      .json({ errorMessage: "Wrong email or password", statusCode: 404 });
  }
});

app.post("/checkTheAuth", (req, res) => {
  const { token } = req.body;

  if (token != "") {
    JWT.verify(token, process.env.PRIVATE_KEY, (err, decodedToken) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMessage: err.message, statusCode: 400 });
      } else {
        return res
          .status(200)
          .json({ successMessage: "Done", statusCode: 200 });
      }
    });
  }
});

app.post("/addNewFriend", async (req, res) => {
  const { newFriendForId, newFriendName } = req.body;
  const usersInDB = await User.find({ username: newFriendName });

  if (usersInDB.length > 0) {
    if (newFriendForId != usersInDB[0].id) {
      const howManyChats = await newChat.find({
        $or: [
          { NewFriendForId: newFriendForId, NewFriendNameId: usersInDB[0].id },
        ],
      });

      if (howManyChats.length >= 1) {
        return res.status(400).json({
          errorMessage: "You added this user",
          statusCode: 400,
        });
      } else {
        const NewChat = new newChat({
          NewFriendForId: newFriendForId,
          NewFriendNameId: usersInDB[0].id,
        });

        await NewChat.save();
        return res.status(201).json({
          successMessage: "New chat added successfully",
          statusCode: 201,
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: "You can't add yourself",
        statusCode: 400,
      });
    }
  } else {
    return res.status(404).json({
      errorMessage: "This user doesn't exist",
      statusCode: 404,
    });
  }
});

app.post("/getFriends", async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const friendsInDB = await newChat.find({ NewFriendForId: userId });
    return res.status(200).json({
      successMessage: "Done",
      statusCode: 200,
      yourFriends: friendsInDB,
    });
  }
});

app.delete("/deleteFriend", async (req, res) => {
  const { friendId, whoFriendId } = req.body;
  if (friendId && whoFriendId) {
    await newChat.deleteOne({
      NewFriendForId: whoFriendId,
      NewFriendNameId: friendId,
    });
    return res.status(200).json({
      successMessage: "Friend deleted successfully",
      statusCode: 200,
    });
  }
});

app.post("/checkTheFriendInfo", async (req, res) => {
  const { friendId } = req.body;

  if (friendId) {
    const usersInDB = await User.find({ id: friendId });
    if (usersInDB[0].online == true) {
      return res.status(200).json({
        successMessage: true,
        statusCode: 200,
      });
    } else {
      return res.status(400).json({
        successMessage: false,
        statusCode: 400,
      });
    }
  }
});

app.get("/getFriendName/:friendId", async (req, res) => {
  const friendId = req.params.friendId;
  const friendInDB = await User.find({ id: friendId });

  return res.status(200).json({
    successMessage: "Got the friend username",
    statusCode: 200,
    friendName: friendInDB[0].username,
  });
});

app.get("/getChatName/:chatName", async (req, res) => {
  const chatName = req.params.chatName;

  const chatNamesInDB = await User.find();
  const filteredChatNames = chatNamesInDB.filter((userName) =>
    userName.username.toLowerCase().includes(chatName)
  );

  return res.status(200).json({
    successMessage: "Got the chat names successfully",
    statusCode: 200,
    chatNames: filteredChatNames,
  });
});

app.post("/addNewMessage", async (req, res) => {
  const { fromWhoId, toWhoId, theMessage } = req.body;

  if (fromWhoId && toWhoId && theMessage) {
    const todayMinutes = new Date().getMinutes();
    const todayHours = new Date().getHours();
    let messageTime;

    if (todayMinutes < 10) {
      const MessageTime = `${todayHours}:0${todayMinutes}`;
      messageTime = MessageTime;
    } else {
      const MessageTime = `${todayHours}:${todayMinutes}`;
      messageTime = MessageTime;
    }

    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const Day = new Date().getDate();
    const messageDate = `${Year}-${Month}-${Day}`;

    const NewMessage = new newMessage({
      id: idNumberForMessages,
      fromWhoId: fromWhoId,
      toWhoId: toWhoId,
      theMessage: theMessage,
      messageTime: messageTime,
      messageDate: messageDate,
      edited: false,
    });

    idNumberForMessages += 1;

    await NewMessage.save();
    return res.status(201).json({
      successMessage: "New Message Added",
      statusCode: 201,
    });
  }
});

app.post("/getMessages", async (req, res) => {
  const { userId, sendToWhoId } = req.body;

  if (userId && sendToWhoId) {
    const messagesInDB = await newMessage.find({
      $or: [
        { fromWhoId: userId, toWhoId: sendToWhoId },
        { fromWhoId: sendToWhoId, toWhoId: userId },
      ],
    });
    return res.status(200).json({
      successMessage: "Got the messages",
      statusCode: 200,
      yourMessages: messagesInDB,
    });
  }
});

app.patch("/editMessage/:messageId", async (req, res) => {
  const { theNewMessage } = req.body;
  const messageId = req.params.messageId;

  await newMessage.updateOne(
    { id: messageId },
    { $set: { theMessage: theNewMessage, edited: true } }
  );
  return res.status(200).json({
    successMessage: "Message edited successfully",
    statusCode: 200,
  });
});

app.delete("/deleteMessage", async (req, res) => {
  const { messageId, whoMessageId } = req.body;

  if (messageId && whoMessageId) {
    await newMessage.deleteOne({
      fromWhoId: whoMessageId,
      id: messageId,
    });
    return res.status(200).json({
      successMessage: "Message deleted successfully",
      statusCode: 200,
    });
  }
});

app.post("/checkTheNewMessages/:theMood", async (req, res) => {
  const theMood = req.params.theMood;

  if (theMood == "Chat") {
    const { userId, sendToWhoId } = req.body;
    const messagesInDB = await newMessage.find({
      $or: [
        { fromWhoId: userId, toWhoId: sendToWhoId },
        { fromWhoId: sendToWhoId, toWhoId: userId },
      ],
    });
    return res.status(200).json({
      successMessage: "Got the messages",
      statusCode: 200,
      newMessages: messagesInDB,
    });
  } else if (theMood == "Group") {
    const { groupId } = req.body;
    const messagesInDB = await newMessageInGroup.find({
      theGroupId: groupId,
    });

    return res.status(200).json({
      successMessage: "Got the messages",
      statusCode: 200,
      newMessages: messagesInDB,
    });
  }
});

app.get("/getMessageDetails/:messageId/:mood", async (req, res) => {
  const messageId = req.params.messageId;
  const theMood = req.params.mood;

  if (theMood == "Chat") {
    const messageInDB = await newMessage.find({ id: messageId });

    return res.status(200).json({
      successMessage: "Got the message details",
      statusCode: 200,
      messageDetails: messageInDB[0],
    });
  } else if (theMood == "Group") {
    const groupMessageInDB = await newMessageInGroup.find({ id: messageId });

    return res.status(200).json({
      successMessage: "Got the message details",
      statusCode: 200,
      messageDetails: groupMessageInDB[0],
    });
  }
});

app.get("/getEmojis", async (req, res) => {
  const apiKey = "55a63c34bdb9a725b4d53ad326d12a2e1d908de7";
  const allEmojis = [];

  // if (apiKey) {
  //   try {
  //     const response = await fetch(
  //       `https://emoji-api.com/emojis?access_key=${apiKey}`
  //     );
  //     const data = await response.json();
  //     if (response.ok) {
  //       for (let i = 0; i < data.length; i++) {
  //         allEmojis.push(data[i]);
  //       }
  //       return res.status(200).json({
  //         successMessage: "Got the emojis",
  //         statusCode: 200,
  //         allEmojis: allEmojis,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
});

app.post("/addNewGroup", async (req, res) => {
  const { theGroupName, theCreater, theGroupMates } = req.body;

  if (theCreater && theGroupMates) {
    const groupAdminsId = [theCreater];
    const groupMatesId = [];
    const todayMinutes = new Date().getMinutes();
    const todayHours = new Date().getHours();
    let groupTime;

    if (todayMinutes < 10) {
      const GroupTime = `${todayHours}:0${todayMinutes}`;
      groupTime = GroupTime;
    } else {
      const GroupTime = `${todayHours}:${todayMinutes}`;
      groupTime = GroupTime;
    }

    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const Day = new Date().getDate();
    const groupDate = `${Year}-${Month}-${Day}`;

    for (let i = 0; i < theGroupMates.length; i++) {
      const getGroupMatesId = await User.find({ username: theGroupMates[i] });
      for (let i = 0; i < getGroupMatesId.length; i++) {
        groupMatesId.push(getGroupMatesId[i].id);
      }
    }

    const NewGroup = new newGroup({
      id: idNumberForGroups,
      theGroupName: theGroupName,
      theCreater: theCreater,
      theGroupMates: groupMatesId,
      theGroupAdmins: groupAdminsId,
      groupTime: groupTime,
      groupDate: groupDate,
    });

    idNumberForGroups += 1;

    await NewGroup.save();
    return res.status(201).json({
      successMessage: "Group created successfully",
      statusCode: 201,
    });
  }
});

app.get("/getGroups/:userId", async (req, res) => {
  const userId = req.params.userId;
  const groupsInDB = await newGroup.find();
  const yourGroups = [];

  for (let i = 0; i < groupsInDB.length; i++) {
    for (let j = 0; j < groupsInDB[i].theGroupMates.length; j++) {
      if (groupsInDB[i].theGroupMates[j] == userId) {
        yourGroups.push(groupsInDB[i]);
      }
    }
  }

  return res.status(200).json({
    successMessage: "Got the groups successfully",
    statusCode: 200,
    yourGroups: yourGroups,
  });
});

app.patch("/editGroupSettings/:editerId/:groupId", async (req, res) => {
  const { theNewGroupName, theNewGroupMates, theNewGroupAdmins } = req.body;
  const theNewGroupMatesId = [];
  const theNewGroupAdminsId = [];

  const editerId = req.params.editerId;
  const groupId = req.params.groupId;
  const groupsInDB = await newGroup.find({ id: groupId });
  let theCreaterExistInAdmins;

  if (groupsInDB.length > 0) {
    for (let i = 0; i < theNewGroupMates.length; i++) {
      const userIdInDB = await User.find({
        username: theNewGroupMates[i].toLowerCase(),
      });
      theNewGroupMatesId.push(userIdInDB[0].id);
    }
    for (let i = 0; i < theNewGroupAdmins.length; i++) {
      const userIdInDB = await User.find({
        username: theNewGroupAdmins[i].toLowerCase(),
      });
      theNewGroupAdminsId.push(userIdInDB[0].id);
    }
    for (let i = 0; i < groupsInDB[0].theGroupAdmins.length; i++) {
      if (editerId == groupsInDB[0].theGroupAdmins[i]) {
        for (let i = 0; i < theNewGroupAdminsId.length; i++) {
          if (groupsInDB[0].theCreater == theNewGroupAdminsId[i]) {
            theCreaterExistInAdmins = true;
            break;
          } else {
            theCreaterExistInAdmins = false;
          }
        }
        if (theCreaterExistInAdmins == true) {
          await newGroup.updateOne(
            { id: groupId },
            {
              $set: {
                theGroupName: theNewGroupName,
                theGroupMates: theNewGroupMatesId,
                theGroupAdmins: theNewGroupAdminsId,
              },
            }
          );
          return res.status(200).json({
            successMessage: "Settings edited successfully",
            statusCode: 200,
          });
        } else {
          return res.status(400).json({
            errorMessage: "You can't remove the creater",
            statusCode: 400,
          });
        }
      } else {
        return res.status(400).json({
          errorMessage: "You are not an admin",
          statusCode: 400,
        });
      }
    }
  }
});

app.delete("/deleteGroup", async (req, res) => {
  const { groupId } = req.body;

  await newGroup.deleteOne({ id: groupId });
  return res.status(200).json({
    successMessage: "Group deleted successfully",
    statusCode: 200,
  });
});

app.get("/leaveGroup/:userId/:groupId", async (req, res) => {
  const userId = req.params.userId;
  const groupId = req.params.groupId;
  const groupInDB = await newGroup.find({ id: groupId });
  const theGroupMatesWithoutTheLeftUser = [];
  const theGroupAdminsWithoutTheLeftUser = [];

  if (groupInDB.length > 0) {
    for (let i = 0; i < groupInDB[0].theGroupMates.length; i++) {
      if (userId != groupInDB[0].theGroupMates[i]) {
        theGroupMatesWithoutTheLeftUser.push(groupInDB[0].theGroupMates[i]);
      }
    }
    for (let i = 0; i < groupInDB[0].theGroupAdmins.length; i++) {
      if (userId != groupInDB[0].theGroupAdmins[i]) {
        theGroupAdminsWithoutTheLeftUser.push(groupInDB[0].theGroupAdmins[i]);
      }
    }
    await newGroup.updateOne(
      { id: groupId },
      {
        $set: {
          theGroupAdmins: theGroupAdminsWithoutTheLeftUser,
          theGroupMates: theGroupMatesWithoutTheLeftUser,
        },
      }
    );

    return res.status(200).json({
      successMessage: "You leaved the group successfully",
      statusCode: 200,
    });
  }
});

app.post("/addNewDataToGroup", async (req, res) => {
  const { theGroupId, theMessage, fromWhoId } = req.body;

  if (theGroupId && theMessage && fromWhoId) {
    const todayMinutes = new Date().getMinutes();
    const todayHours = new Date().getHours();
    let messageTime;

    if (todayMinutes < 10) {
      const MessageTime = `${todayHours}:0${todayMinutes}`;
      messageTime = MessageTime;
    } else {
      const MessageTime = `${todayHours}:${todayMinutes}`;
      messageTime = MessageTime;
    }

    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const Day = new Date().getDate();
    const messageDate = `${Year}-${Month}-${Day}`;

    const NewMessageInGroup = new newMessageInGroup({
      id: idNumberForGroupMessages,
      fromWhoId: fromWhoId,
      theGroupId: theGroupId,
      theMessage: theMessage,
      messageTime: messageTime,
      messageDate: messageDate,
      edited: false,
    });

    idNumberForGroupMessages += 1;

    await NewMessageInGroup.save();
    return res.status(201).json({
      successMessage: "Message created successfully",
      statusCode: 201,
    });
  }
});

app.get("/getGroupsData/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const groupInDB = await newMessageInGroup.find({ theGroupId: groupId });

  return res.status(200).json({
    successMessage: "Got the group data",
    statusCode: 200,
    yourMessages: groupInDB,
  });
});

app.delete("/deleteGroupMessage", async (req, res) => {
  const { messageId, whoMessageId } = req.body;

  if (messageId && whoMessageId) {
    await newMessageInGroup.deleteOne({
      id: messageId,
      fromWhoId: whoMessageId,
    });
    return res.status(200).json({
      successMessage: "Message deleted successfully",
      statusCode: 200,
    });
  }
});

app.patch("/editGroupMessage/:id", async (req, res) => {
  const { theNewMessage } = req.body;
  const messageId = req.params.id;

  if (messageId && theNewMessage) {
    await newMessageInGroup.updateOne(
      { id: messageId },
      { $set: { theMessage: theNewMessage, edited: true } }
    );
    return res.status(200).json({
      successMessage: "Message edited successfully",
      statusCode: 200,
    });
  }
});

app.get("/getGroupDetails/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const groupInDB = await newGroup.find({ id: groupId });

  return res.status(200).json({
    successMessage: "Got the groupDetails",
    statusCode: 200,
    groupDetails: groupInDB[0],
  });
});

app.get("/getUserDetails/:userId", async (req, res) => {
  const userId = req.params.userId;
  const usersInDB = await User.find({ id: userId });

  if (usersInDB.length >= 0) {
    return res.status(200).json({
      successMessage: "Got the details successfully",
      statusCode: 200,
      userDetails: usersInDB[0],
    });
  } else {
    return res.status(404).json({
      successMessage: "This user doesn't exist",
      statusCode: 404,
    });
  }
});

app.patch("/editAccountSettings/:userID", async (req, res) => {
  const { accountName, accountDescription } = req.body;
  const userId = req.params.userID;

  if (accountName && accountDescription) {
    const userNameOfUserId = await User.find({ id: userId });
    if (userNameOfUserId[0].username == accountName) {
      await User.updateOne(
        { id: userId },
        { $set: { username: accountName, description: accountDescription } }
      );
      return res.status(200).json({
        successMessage: "Account edited successfully",
        statusCode: 200,
      });
    } else {
      const usersInDB = await User.find({ username: accountName });
      if (usersInDB.length > 0) {
        return res.status(400).json({
          errorMessage: "The username is already exist",
          statusCode: 400,
        });
      } else {
        await User.updateOne(
          { id: userId },
          { $set: { username: accountName, description: accountDescription } }
        );
        return res.status(200).json({
          successMessage: "Account edited successfully",
          statusCode: 200,
        });
      }
    }
  }
});

app.patch("/checkTheUserConnection", async (req, res) => {
  const { userID, connectionType } = req.body;

  if (userID && connectionType) {
    if (connectionType == true) {
      await User.updateOne({ id: userID }, { $set: { online: true } });
      return res.status(200).json({
        successMessage: "User online",
        statusCode: 200,
      });
    } else {
      await User.updateOne({ id: userID }, { $set: { online: false } });
      return res.status(400).json({
        successMessage: "User offline",
        statusCode: 400,
      });
    }
  }
});

app.patch("/logout", async (req, res) => {
  const { userID } = req.body;

  if (userID) {
    await loggedUser.updateOne({ id: userID }, { $set: { logged: false } });
    await User.updateOne({ id: userID }, { $set: { online: false } });
    return res.status(200).json({
      successMessage: "Logged out successfully",
      statusCode: 200,
    });
  }
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
