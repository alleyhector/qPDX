import React, { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import { Text } from "react-native-elements";
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { submitEvent } from '../components/Firebase/firebase';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  event_name: Yup.string()
    .label("Event Name")
    .required(),
  event_description: Yup.string()
    .label("Event Description")
    .required()
});

export default function SubmitScreen({ navigation }) {
  useStatusBar('light-content');

  const [submitError, setSubmitError] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState); 
  let type = (isEnabled == true) ? "virtual" : "in person";

  async function handleOnSubmit(values, actions) {
    const { event_name, event_description, timestamp, event_type } = values;  

    try {
      let event_type = type;
      const timestamp = new Date();
      const eventData = { event_name, event_description, timestamp, event_type };
      await submitEvent(eventData);
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{
          event_name: '',
          event_description: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSubmit(values)}
      >
        <FormField
          name="event_name"
          leftIcon="calendar"
          placeholder="Enter event name"
          autoFocus={true}
        />
        <FormField
          name="event_description"
          leftIcon="calendar-edit"
          placeholder="Enter event description"
          as="textarea"
        />
        <Text h3>
          This event is {type}
        </Text>
        <Text>
          Toggle below to change whether your event is in person or Virtual
        </Text>
        <Switch
          name="event_type"
          trackColor={{ false: Colors.lightGrey, true: Colors.ghostWhite }}
          thumbColor={isEnabled ? Colors.primary : Colors.secondary}
          ios_backgroundColor= {Colors.lightGrey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <FormButton title={'Submit'} />
        {<FormErrorMessage error={submitError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.mediumGrey
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});