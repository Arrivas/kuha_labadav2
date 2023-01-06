import { View, Text } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";
import CreateShopProgress from "./CreateShopProgress";
import colors from "../../../../config/colors";

const FirstStep = ({ handleFirstStepSubmit }) => {
  const initialValues = { name: "", email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormikField initialValues={initialValues} onSubmit={handleFirstStepSubmit}>
      <View className="">
        <AppFormField
          placeholder="shop name"
          containerStyle="w-[80%]"
          name="name"
          iconName="alphabetical"
        />
        <AppFormField
          placeholder="email"
          containerStyle="w-[80%]"
          name="email"
          iconName="email"
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
        {/* check/next button */}
        <View
          className="self-end px-7 py-3 rounded-full"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <SubmitButton
            title="check"
            defaultStyle={false}
            textClass="text-white font-bold"
          />
        </View>
      </View>
    </FormikField>
  );
};

export default FirstStep;
