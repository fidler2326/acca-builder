import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Fixtures',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#029e70',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>No Fixtures</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
