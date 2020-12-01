import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NetInfo,
} from 'react-native';
import MainScene from './app/components/mainScene'
import WordFeed from './app/components/words'
import SearchScreen from './app/components/search'
import DetailsScreen from './app/components/details'
import NoConnection from './app/components/noInternet'
import { createStackNavigator, StackNavigator,  createAppContainer, createBottomTabNavigator } from "react-navigation";
import { NavigationActions } from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const RootStack = createStackNavigator ({
    Search: {
      screen: SearchScreen
    },

    Details: {
      screen:DetailsScreen,
      //Permet d'ajouter le titre de la route en utilisant navigation.state.params.name (optional)
      navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile'`,
      }),

      //Permet d'envoyer les paramètres
      params: { search: 'Playstation',
              }
    },

    WoTD:{
      screen: WordFeed,

      navigationOptions: ({ navigation }) => ({
      title: `Mot recherché : ${navigation.state.params.search}`,
      }),

      //Params
      params: { feedURL: 'http://api.urbandictionary.com/v0/define?term='}
    },

    WoTD_2:{
      screen: WordFeed,

      navigationOptions: ({ navigation }) => ({
      title: `Mot du jour`,
      }),

      //Params
      params: { feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day'}
    },

    Random:{
      screen: WordFeed,

      navigationOptions: ({ navigation }) => ({
      title: 'Random',
      }),

      //Params
      params: { feedURL: 'https://api.urbandictionary.com/v0/random' }
    },

    Home:{
      screen: MainScene
    }


  },
  //Initial Routename = Screen de lancement, on part donc sur la recherche
  { initialRouteName: 'Search'});


export class UrbanDictionary extends Component {
   state = {
        isNetworkConnected: false
    }
    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().then(isConnected =>{
            {this.setState({ status: isConnected });}
        });
        console.log('component did mount')
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ isNetworkConnected: isConnected });
        console.log(`is connected: ${isConnected}`);
    }

  render() {
        if (this.state.isNetworkConnected === false){
            //We're not connected
            return ( < NoConnection / > );
        }else
        //We're connected
        {
          return <App />;
        }// Else*/
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('UrbanDictionary', () => UrbanDictionary);

const App = createAppContainer(RootStack);

export default App;