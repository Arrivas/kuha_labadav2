import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import CreateShopProgress from "./shop/CreateShopProgress";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";
import "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";

// steps
import FirstStep from "./shop/FirstStep";
import SecondStep from "./shop/SecondStep";
import ThirdStep from "./shop/ThirdStep";
import FourthStep from "./shop/FourthStep";

const CreateShop = ({}) => {
  const [progress, setProgress] = useState(1);
  const [credsAvailable, setCredsAvailable] = useState({});
  const [loading, setLoading] = useState(false);

  const [openHours, setOpenHours] = useState("");
  const [closeHours, setCloseHours] = useState("");
  const [openCloseErr, setOpenCloseErr] = useState("");

  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [selectedServices, setSelectedService] = useState([
    { offering: false, value: "wash-dry-fold" },
    {
      offering: false,
      value: "dry-cleaning",
    },
    {
      offering: false,
      value: "ironing",
    },
    {
      offering: false,
      value: "comforter/blankets",
    },
  ]);
  const [selectedServicesError, setSelectedServicesError] = useState("");

  const [firstStepDetails, setFirstStepDetails] = useState({});
  const [secondStepDetails, setSecondStepDetails] = useState({});
  const [thirdStepDetails, setThirdStepDetails] = useState({});

  const handlePrev = () => setProgress((prevState) => (prevState -= 1));

  const handleFirstStepSubmit = (val) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("laundryProviders")
      .where("name", "==", val.name.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) {
          ToastAndroid.show(
            "select other shop name that is not taken",
            ToastAndroid.SHORT
          );
          setLoading(false);
          return setCredsAvailable({ name: false });
        }
        setCredsAvailable({
          name: true,
        });
      })
      .catch((err) => console.log(err, "shop name"));

    firebase
      .firestore()
      .collection("admins")
      .where("email", "==", val.email.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) {
          ToastAndroid.show(
            "please select other email that is not taken",
            ToastAndroid.SHORT
          );
          setLoading(false);
          return setCredsAvailable((lastState) => ({
            ...lastState,
            email: false,
          }));
        }
        setCredsAvailable((lastState) => ({
          ...lastState,
          email: true,
        }));
      })
      .catch((err) => console.log(err, "shop name"));
    setFirstStepDetails(val);
    setLoading(false);
    if (credsAvailable.email && credsAvailable.name) setProgress(2);
  };

  const handleSecondStepSubmit = (values) => {
    if (!openHours || !closeHours)
      return setOpenCloseErr("fields must not be empty");
    setOpenCloseErr("");
    setSecondStepDetails(values);
    setProgress(3);
  };

  const handleThirdStepSubmit = () => {
    if (!image || image === null)
      return setImageError("select your shop image");
    const counter = selectedServices.filter((item) => item.offering === false);
    if (counter.length === 4)
      return setSelectedServicesError(
        "please select at least one shop service"
      );
    setSelectedServicesError("");
    if (selectedServicesError !== "") return;
    setImageError("");
    setThirdStepDetails(image, selectedServices);
    setProgress(4);
  };

  const handleFourthStepSubmit = async () => {
    const imageExtension = image.split(".")[image.split(".").length - 1];
    try {
      const ref = firebase
        .storage()
        .ref(
          `shopImages/${firstStepDetails.name}/${firstStepDetails.name}_shopImage.${imageExtension}`
        );
      await ref.putFile(image);
    } catch (error) {
      console.log(error);
    }
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/labada-app.appspot.com/o/shopImages%2F${firstStepDetails.name}%2F${firstStepDetails.name}_shopImage.${imageExtension}?alt=media`;

    const toSubmitObj = {
      deliveredByItems: [
        { label: secondStepDetails.deliveryDate1 },
        { label: secondStepDetails.deliveryDate2 },
      ],
      description: secondStepDetails.description,
      email: firstStepDetails.email,
      geometryLocation: {
        lat: secondStepDetails.latitude,
        lng: secondStepDetails.longitude,
      },
      imageUrl,
      name: firstStepDetails.name,
      notifications: [],
      openHours: {
        from: openHours,
        to: closeHours,
      },
      pendingServices: {
        max: secondStepDetails.max,
        ongoing: [],
        history: [],
      },
      pricing: {
        minPerKilo: secondStepDetails.minPerKilo,
        rate: secondStepDetails.rate,
      },
      selectedServices,
      userType: "admin",
      vicinity: secondStepDetails.vicinity,
      password: firstStepDetails.password,
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        firstStepDetails.email,
        firstStepDetails.password
      )
      .then((res) => {
        const uid = res.user.uid;
        firebase
          .firestore()
          .collection("laundryProviders")
          .add(toSubmitObj)
          .then((laundryRes) => {
            laundryRes.update({ laundry_id: laundryRes.id });
            firebase
              .firestore()
              .collection("admins")
              .add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                email: toSubmitObj.email,
                laundry_id: laundryRes.id,
                name: toSubmitObj.name,
                password: toSubmitObj.password,
                userId: uid,
              })

              .then((adminRes) => {
                adminRes.update({ docId: adminRes.id });
              })
              .catch((err) =>
                ToastAndroid.show("Something went wrong.", ToastAndroid.LONG)
              );
            firebase
              .firestore()
              .collection("laundryProviders")
              .doc(laundryRes.id)
              .collection("pendingServices")
              .doc("history");
          })
          .catch((err) =>
            ToastAndroid.show("Something went wrong.", ToastAndroid.LONG)
          );
      })
      .catch((err) =>
        ToastAndroid.show("Something went wrong.", ToastAndroid.LONG)
      );
  };

  return (
    <>
      {progress === 1 ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-1 justify-center  p-2">
            <CreateShopProgress progress={progress} />
            <FirstStep
              loading={loading}
              credsAvailable={credsAvailable}
              firstStepDetails={firstStepDetails}
              setCredsAvailable={setCredsAvailable}
              handleFirstStepSubmit={handleFirstStepSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : progress === 2 ? (
        <View className="flex-1 justify-center p-2">
          <SecondStep
            progress={progress}
            openHours={openHours}
            closeHours={closeHours}
            handlePrev={handlePrev}
            setProgress={setProgress}
            setOpenHours={setOpenHours}
            openCloseErr={openCloseErr}
            setCloseHours={setCloseHours}
            setOpenCloseErr={setOpenCloseErr}
            secondStepDetails={secondStepDetails}
            handleSecondStepSubmit={handleSecondStepSubmit}
          />
        </View>
      ) : progress === 3 ? (
        <>
          <View className="flex-1 justify-center p-2">
            <View className="mt-24">
              <CreateShopProgress progress={progress} />
            </View>
            <ThirdStep
              image={image}
              setImage={setImage}
              handlePrev={handlePrev}
              imageError={imageError}
              setImageError={setImageError}
              selectedServices={selectedServices}
              thirdStepDetails={thirdStepDetails}
              setSelectedService={setSelectedService}
              selectedServicesError={selectedServicesError}
              handleThirdStepSubmit={handleThirdStepSubmit}
            />
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center p-2">
          <View className="mt-24">
            <CreateShopProgress progress={progress} />
          </View>
          <FourthStep
            handlePrev={handlePrev}
            handleFourthStepSubmit={handleFourthStepSubmit}
          />
        </View>
      )}
    </>
  );
};

export default CreateShop;
