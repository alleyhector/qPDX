import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";

function Events({ navigation, firebase }) {

  const [ event, setEvent ] = useState('');
  const ref = firebase.readEvents();
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    return ref
    .orderBy('timestamp', 'asc')
    .onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { event_name, event_description, timestamp, type } = doc.data();
        list.push({
          timestamp,
          event_name,
          event_description,
          type,
        });
      });

      setEvents(list);

    });
  }, []);

  const renderEntity = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text>
          {index}. {item.event_name}
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
    <View style={styles.container}>
      <FlatList 
        data={events}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderEntity}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  item: {
    margin: 10
  },
});

export default withFirebaseHOC(Events);