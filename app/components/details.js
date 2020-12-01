import React, { Component } from 'react';
import { StyleSheet, Button, View, TextInput, Text, ListView, Dimensions, TouchableOpacity } from 'react-native';

export default class DetailsScreen extends Component { 
  render() {

  	const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    const term = navigation.getParam('search');
    const titleRoute = navigation.getParam('title');


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Ecran en balle tu connais</Text>

        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>term: {JSON.stringify(term)}</Text>
        <Text>titre de la route: {JSON.stringify(titleRoute)}</Text>

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}