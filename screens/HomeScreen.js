import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen({ navigation }) {
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Button
        title="Go to Submit"
        onPress={() => navigation.navigate('Submit')}
      />
      <Button
        title="Go to Events"
        onPress={() => navigation.navigate('Events')}
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
