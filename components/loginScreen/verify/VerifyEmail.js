import {
  View,
  Text,
  Image,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../../../auth/useAuth";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import colors from "../../../config/colors";
import DisplayMessage from "./DisplayMessage";

const VerifyEmail = ({ setIsEmailVerified, emailVerified, userState }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSecondTime, setIsSecondTime] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logOut } = useAuth();

  const sendEmailVerification = () => {
    setTimeLeft(25);
    setIsSecondTime(true);
    if (!userState?.email) return;
    setLoading(true);
    userState
      .sendEmailVerification()
      .then((data) => {
        ToastAndroid.show("verification sent", ToastAndroid.SHORT);
        setDisplayMessage(true);
        setLoading(false);
      })
      .catch((err) => console.log(err, "error"));
    setLoading(false);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }
    // exit early when we reach 0
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      {emailVerified ? (
        <></>
      ) : (
        <SafeScreenView enablePadding>
          <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View className="flex-1">
                {/* back to log in */}
                <View className="flex-1 items-center justify-center  ">
                  <Image
                    className="h-[100px] w-[100px]"
                    resizeMode="cover"
                    source={require("../../../assets/verify_email.png")}
                  />
                  {userState?.email && (
                    <Text>verify your email first before proceeding</Text>
                  )}
                  <Text className="font-bold pb-5">
                    {userState?.email || "please refresh the application"}
                  </Text>
                  {/* back to log in */}

                  {timeLeft === null ? (
                    <View className="w-[80%]">
                      <TouchableNativeFeedback
                        onPress={() => {
                          sendEmailVerification();
                          // setIsEmailVerified(true);
                        }}
                      >
                        <View
                          className="px-5 py-[14px] items-center rounded-md flex-row justify-center"
                          style={{
                            backgroundColor: colors.primary,
                          }}
                        >
                          <Text className="text-gray-50 font-bold">
                            {isSecondTime ? "re-send" : "send"} verification
                          </Text>
                          {loading ? (
                            <ActivityIndicator className="ml-2" color="white" />
                          ) : (
                            <></>
                          )}
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  ) : (
                    <View>
                      <Text className="self-center font-semibold text-center">
                        please wait before re-sending again
                      </Text>
                      <Text className="self-center font-light">{timeLeft}</Text>
                    </View>
                  )}
                </View>
                <View className="items-center flex-1">
                  {/* display message */}
                  {displayMessage ? (
                    <DisplayMessage setDisplayMessage={setDisplayMessage} />
                  ) : null}
                  <View className="p-2">
                    <TouchableNativeFeedback
                      onPress={() => {
                        logOut();
                        setIsEmailVerified(true);
                      }}
                    >
                      <View className="flex-row">
                        <Icon
                          size={22}
                          iconLibrary="AntDesign"
                          iconName="swapleft"
                        />
                        <Text>back to log in</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        </SafeScreenView>
      )}
    </>
  );
};

export default VerifyEmail;
