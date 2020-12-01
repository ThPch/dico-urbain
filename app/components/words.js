import React, { Component } from 'react';
import { StyleSheet, Button, View, FlatList, Text, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const {width, height} = Dimensions.get('window')

import Card from './wordCard'

export default class words extends Component { 

      static navigationOptions = {
        
      };

    constructor() {
        super();
        this.state = {
            data: [],
            loaded: false,
            isAnimating: true,
            isRefreshing: true,
            feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day'

        };
    
    }

    componentDidMount() {
        this.setState({feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day'})
        
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.fetchWordsOfTheDay()
        });

    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen
        clearTimeout(this.t);
    }


    fetchWordsOfTheDay(){

        const { navigation } = this.props;
        var feedURL = navigation.getParam('feedURL');

        if(navigation.getParam('search', ''))
        {
            var term = navigation.getParam('search', '');
                feedURL = feedURL.concat(term);
                //console.warn(feedURL)
        }
    

        this.setState({isRefreshing: true})
        
        fetch(feedURL).then((response) => response.json()).then((newsItems) => {
            this.setState({
                loading:false,
                data:newsItems.list,
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })

        }).catch((error) => {
            this.setState({error, loading: false,
                    loaded: true,
                    isRefreshing: false,
                    isAnimating: false})
            console.error(error);
        });

    }

    _renderRows(data) {
        return (<Card style={styles.card} data={data}/>);
    }

    renderLoadingIndicator() {
        return(
        <View style={{flexDirection: 'column', flex: 1, backgroundColor:'grey'}}>
           { <TouchableOpacity  activeOpacity={0.6} underlayColor='rgba(0,0,0,0.001)' style={styles.closeButton} onPress={() => console.warn("button ds words.js")}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon name="close" color='rgba(52, 152, 219,1.0)' size={44}/>
                </View>
            </TouchableOpacity> 
          }
            <View style = {{ flexDirection: 'column', justifyContent: 'center', flex: 1, backgroundColor:'grey'}} > 
                <ActivityIndicator
                    animating={this.state.animating}
                    color='#e67e22'
                    style={[ styles.centering, {height: 80}]}
                    size="large"/>
            </View>
            

        </View>
        );
    }

    renderWordsFeed() {
        return (
            <View style={styles.container}>
                <FlatList
                
                    contentContainer = { styles.listContainer }
                    data={this.state.data}
                    renderItem={({item}) => this._renderRows(item)}
                    keyExtractor={(item, index) => item.id}
                    
                    initialNumToRender={8}
                    /*
                    
                    data={this.state.data}
                    onRefresh={() => this.renderRefreshControl()}
                    refreshing={this.state.isLoading}
                    initialNumToRender={8}
                    */
                />
            </View>
         );
    }


    render() {
        const { navigation } = this.props;


        return this.state.isRefreshing? this.renderLoadingIndicator() : this.renderWordsFeed()
    }

    renderRefreshControl()
    {
        this.setState({ isLoading: true })
        this.renderWordsFeed()
    }

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'stretch',
        width:width
    },
    listContainer: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'center',
        overflow:'visible'
    },

    title:{
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        color: '#3498db',
        marginTop:5
    },
    card:{
        alignItems: 'center',
        justifyContent: 'center',

    },
    closeButton:{
        marginTop:-60,
        padding:10, 
        margin:20,
        alignItems:'flex-end', 
        backgroundColor:'transparent', 
        height:50,
        borderRadius:4,
        marginTop: 44,
    },

});