import { View, Text } from "react-native";
import React, { useState } from "react";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";
import * as Yup from "yup";

const SecondStep = ({ handleSecondSubmit }) => {
  const initialValues = { name: "", email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(6).max(32).label("shop name"),
    email: Yup.string().email().required().label("email"),
    password: Yup.string().min(6).max(32).required(),
  });
  return (
    <>
      <FormikField
        initialValues={initialValues}
        onSubmit={handleSecondSubmit}
        validationSchema={validationSchema}
      >
        <View>
          <AppFormField
            placeholder="shop name"
            containerStyle="w-[80%]"
            name="name"
            iconName="alphabetical"
          />
        </View>
      </FormikField>
    </>
  );
};

export default SecondStep;
