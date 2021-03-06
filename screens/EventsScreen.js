import React, { useState, useEffect } from 'react';
import { 
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { Text } from "react-native-elements";
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import { readEvents } from '../components/Firebase/firebase';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';

export default function EventsScreen({ navigation }) {
  useStatusBar('light-content');

  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    return readEvents()
    .orderBy('timestamp', 'asc')
    .onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { event_name, event_description, event_type, timestamp } = doc.data();
        list.push({
          timestamp,
          event_name,
          event_description,
          event_type
        });
      });
      setEvents(list);
    },
      error => {
        console.log(error)
      });
  }, []);

    const renderEntity = ({item, index}) => {
      const backgroundColor = (item.event_type == "virtual") ? Colors.lightGrey : Colors.mediumGrey;
      console.log(item);
      return (
        <View style={[styles.item, { backgroundColor: backgroundColor }]}>
          <Text h3>
            {item.event_name}
          </Text>
          <Text>
            &nbsp; {item.event_description}
          </Text>
          <Text>
            &nbsp; {item.type}
          </Text>
        </View>
      )
    }

  return (
    <SafeView style={styles.container}>
      <FlatList 
        data={events}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={renderEntity}
      />
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
    backgroundColor: Colors.mediumGrey
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  item: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary
  }
});