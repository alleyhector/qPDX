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

  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    return firebase.readEvents()
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
    },
      error => {
        console.log(error)
      });
  }, []);

  const renderEntity = ({item, index}) => {
    const backgroundColor = (item.type == "Virtual") ? "pink" : "skyblue";
    return (
      <View style={[styles.item, { backgroundColor: backgroundColor }]}>
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
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black"
  }
});

export default withFirebaseHOC(Events);