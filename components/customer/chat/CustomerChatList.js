import { View, Text } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { AppContext } from "../../../context/AppContext";

const CustomerChatList = () => {
  const { user } = useContext(AppContext);
  const { confirmedBooking } = user;
  const [chatList, setChatList] = useState(null);

  const fetchChatList = async () => {
    const chatIds = [];
    //  connect chat directly to the user
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <View>
      <Text>CustomerChatList</Text>
    </View>
  );
};

export default CustomerChatList;
