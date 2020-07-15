import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";

const validationSchema = Yup.object().shape({
  event_name: Yup.string()
    .label("Event Name")
    .required(),
  event_description: Yup.string()
    .label("Event Description")
    .required()
});

function Submit({ navigation, firebase }) {
  async function handleSubmit(values, actions) {
    const { event_name, event_description, timestamp } = values;

    try {
      const timestamp = new Date().getTime();
      const eventData = { event_name, event_description, timestamp };

      await firebase.submitEvent(eventData);
      navigation.navigate("App");
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <ScrollView>
        <Text>Submit</Text>

        <Formik
          initialValues={{ event_name: "", event_description: "" }}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <>
              <FormInput
                name="event_name"
                value={values.event_name}
                onChangeText={handleChange("event_name")}
                placeholder="Enter event name"
                autoCapitalize="none"
                onBlur={handleBlur("event_name")}
              />
              <ErrorMessage errorValue={touched.event_name && errors.event_name} />
              <FormInput
                name="event_description"
                value={values.event_description}
                onChangeText={handleChange("event_description")}
                placeholder="Enter event description"
                onBlur={handleBlur("event_description")}
              />
              <ErrorMessage errorValue={touched.event_description && errors.event_description} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="SUBMIT EVENT INFO"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  buttonContainer: {
    margin: 25
  },
});

export default withFirebaseHOC(Submit);
