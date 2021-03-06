import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, StatusBar, Image, Text, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feed from './words'
import Header from'./header'
import Search from './search'
import Menu from './menu'
import NoConnection from './noInternet'
import { BottomNavigation } from 'react-native-material-ui';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-native-material-ui';

const {width, height} = Dimensions.get('window')

export default class mainScene extends Component { 

    state = {
        modalVisible: false,
        isNetworkConnected: false
    }

    componentDidMount(){
        this.setState({
            menuIsVisible:false,
        })
    }

    setMenuVisible(visible) {
        this.setState({menuIsVisible: visible})
    }

    onMenuPress() {
        this.setMenuVisible(!this.state.menuIsVisible)
    }

    onSearchPress(){
        this.setMenuVisible(false)
        this.props.navigation.navigate('Search')

    }
    onButtonPress(){
        this.props.navigation.navigate('Search')
    }
    onRandomPress() {
        this.setMenuVisible(false)
            this.props.navigation.navigate('Random')
    }
    onTrendingPressed(word){
        this.props.navigation.navigate('WoTD', { search: word })
    }
    onMenuWoTDPressed(){
        this.setMenuVisible(false)
        this.props.navigation.navigate('WoTD_2')
    }

    header(){
        return(
            <View style={styles.header}> 
                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={() => this.onMenuPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="menu" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={() => this.onSearchPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="search" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  
            </View>
        );
    }

    logo() {
        return(
            <View style={styles.logoContainer}> 
                <Image style={styles.logo} source={require('../resources/IconLarge.png')} resizeMode='cover'/>
            </View>
        );
    }

    buttonGroup(){
        return(
            <View style={styles.buttonGroups}>
                <TouchableOpacity  activeOpacity={0.6} underlayColor='rgba(0,0,0,0.001)' style={styles.feelingLucky} onPress={() => this.onRandomPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="shuffle" color='rgba(149, 165, 166,1.0)' size={30}/>
                        <Text style={styles.buttonTitle}> I'm Feeling Lucky </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        );
    }

    render() {
        return (
            <View style={ styles.container }>
                <Toolbar
                        leftElement="menu"
                        centerElement="Searchable"
                        searchable={{
                          autoFocus: true,
                          placeholder: 'Search',
                        }}
                        rightElement={{
                            menu: {
                                icon: "more-vert",
                                labels: ["item 1", "item 2"]
                            }
                        }}
                        onRightElementPress={ (label) => { console.log(label) }}
                />

                <StatusBar backgroundColor="white" barStyle="default" />
                <Modal 
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.menuIsVisible}
                    onRequestClose={()=>{}}
                > 
                <Menu toggleMenu={() => this.setMenuVisible(!this.state.menuIsVisible)}
                    wordOfTheDay={() => this.onMenuWoTDPressed()}
                    onSearch={() => this.onSearchPress()}
                    onFeelingLucky={() => this.onRandomPress()}
                        />
                </Modal>
                {this.header()}
                {this.logo()}
                {this.buttonGroup()}

                <BottomNavigation active={this.state.active} hidden={false} >
                    <BottomNavigation.Action
                        key="today"
                        icon="today"
                        label="Today"
                        onPress={() => this.setState({ active: 'today' })}
                    />
                    <BottomNavigation.Action
                        key="people"
                        icon="people"
                        label="People"
                        onPress={() => this.setState({ active: 'people' })}
                    />
                    <BottomNavigation.Action
                        key="bookmark-border"
                        icon="bookmark-border"
                        label="Bookmark"
                        onPress={() => this.setState({ active: 'bookmark-border' })}
                    />
                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        label="Settings"
                        onPress={() => this.setState({ active: 'settings' })}
                    />
                </BottomNavigation>
            </View>
        ); 
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },
    header:{
        marginHorizontal:10,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',

        height: 64,
    },
    logo:{
        width:200,
        height: width*0.2,
        alignItems:'center'
    },
    logoContainer:{
        alignItems:'center',
        marginTop:100,
    },
    feelingLucky:{
        padding:10, 
        margin:20,
        alignItems:'center', 
        backgroundColor:'rgba(0,0,0,0.04)', 
        height:50,
        borderRadius:4,
        marginTop: 44,
    },
    buttonTitle:{
        fontSize: 21,
        fontWeight: '200',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        color: 'rgba(149, 165, 166,1.0)',
    },
    latestTitle:{
        fontSize: 21,
        fontWeight: '300',
        textAlign: 'center',
        color: '#34495E',
        marginTop:50,
        marginBottom:20
    },
    latestRowItems:{
        fontSize: 21,
        fontWeight: '300',
        textAlign: 'center',
        color: '#3498db',
        margin:10,

    }
});


// BottomNavigation.Action
const propTypes = {
    /**
    * Will be rendered above the label as a content of the action.
    */
    icon: PropTypes.string.isRequired,
    /**
    * Will be rendered under the icon as a content of the action.
    */
    label: PropTypes.string,
    /**
    * True if the action is active (for now it'll be highlight by primary color)
    */
    active: PropTypes.bool.isRequired,
    /**
    * Callback for on press event.
    */
    onPress: PropTypes.func,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        active: Text.propTypes.style,
        disabled: Text.propTypes.style,
    }),
};


