import { View, Text } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";

const FirstStep = ({
  handleFirstStepSubmit,
  credsAvailable,
  setCredsAvailable,
  loading,
}) => {
  const initialValues = { name: "", email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(6).max(32).label("shop name"),
    email: Yup.string().email().required().label("email"),
    password: Yup.string().min(6).max(32).required(),
  });

  return (
    <FormikField
      initialValues={initialValues}
      onSubmit={handleFirstStepSubmit}
      validationSchema={validationSchema}
    >
      <View>
        <AppFormField
          placeholder="shop name"
          containerStyle="w-[80%]"
          name="name"
          iconName="alphabetical"
          credsAvailable={credsAvailable?.name}
          setCredsAvailable={setCredsAvailable}
          checkAvailability
        />

        <AppFormField
          placeholder="email"
          containerStyle="w-[80%]"
          name="email"
          iconName="email"
          credsAvailable={credsAvailable?.email}
          setCredsAvailable={setCredsAvailable}
          checkAvailability
        />

        <AppFormField
          placeholder="password"
          containerStyle="w-[80%]"
          name="password"
          iconName="lock"
          isPassword
          showPassword={showPassword}
          onShowPassword={setShowPassword}
        />

        <SubmitButton
          mode="default"
          loading={loading}
          disabled={loading}
          containerStyle="self-end w-[32%] py-3"
          textClass="font-bold text-white mr-2 "
          title={credsAvailable.name && credsAvailable.name ? "next" : "check"}
        />
      </View>
    </FormikField>
  );
};

export default FirstStep;
