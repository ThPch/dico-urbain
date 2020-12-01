import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, Dimensions, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BottomNavigation } from 'react-native-material-ui';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-native-material-ui';
import _ from 'lodash'

const {width, height} = Dimensions.get('window')

export default class SearchScreen extends Component { 
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
        loading:false,
        data: [],
        error:null,
        isSearching: false,
        feedURL: 'https://api.urbandictionary.com/v0/autocomplete?term='
    };

  }//constructor()


    componentDidMount() {
    }



    _searchForTerm = _.debounce((term) => {
        let url = this.state.feedURL + term
        /* Adress API to autocomplete :
        https://api.urbandictionary.com/v0/autocomplete?term=wow
        */
        fetch(url).then((response) => response.json()).then((newsItems) => {
            this.setState({
                loading:false,
                data:newsItems,
            })
        }).catch((error) => {
            this.setState({error, loading: false})
            console.error(error);
        });
    }//searchForTerm()
    ,250);

    searchClosed()
    {
         this.setState({
                data:[],
            })
    }



    onSearch(term) {
        //Une fois le mot trouvé, on le fou ici
        //On veut push sur la route WoTD avec la variable search:term (notre mot recherché)
        //http://api.urbandictionary.com/v0/define?term={whore}
        this.props.navigation.navigate('WoTD', { search: term })

    }//onSearch()
    
    _renderRows(data) {
            return (
                <TouchableOpacity underlayColor='white' style={{backgroundColor:'white', height:50}} onPress={() => this.onSearch(data)}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>{data}</Text>
                        <Icon name="call-made" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>
            );
    }//_renderRows()

    _renderHeader = () => (
            <View >
                <Toolbar
                    leftElement="menu"
                    centerElement="Recherche"
                    searchable={{
                      autoFocus: true,
                      placeholder: 'Rechercher un mot',
                      autoCapitalize:'sentences',
                      onChangeText: (text) => this._searchForTerm(text),
                      //onChangeText: (text) => this.setState({query: text}),
                      onSearchClosed: () => this.searchClosed()

                    }}

                    rightElement={{
                        menu: {
                            icon: "more-vert",
                            labels: ["Mot du jour", "Mot aléatoire"]
                        }
                    }}
                    onRightElementPress={ (label) => {
                        if(label.index == 0)
                            {
                                this.props.navigation.navigate('WoTD_2');
                            }
                        if(label.index == 1)
                            {
                                this.props.navigation.navigate('Random');
                            }
                    }}

                    onLeftElementPress={ (label) => { console.warn("Bouton menu") }}
                />
            </View>
        );//_renderHeader()
    


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={ styles.container }>
                <FlatList
                    contentContainer = { styles.listContainer }
                    ListHeaderComponent={this._renderHeader()}
                    data={this.state.data}
                    renderItem={({item}) => this._renderRows(item)}
                    keyExtractor={(item, index) => item.id}
                    
                    initialNumToRender={8}

                    /*

                    onRefresh={() => this.renderRefreshControl()}
                    refreshing={this.state.isLoading}
                    */
                />

                <View style={[{flex: 1}, styles.container]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WoTD')}>
                      <View style={styles.buttonDay}>
                        <Text style={styles.buttonText}>Mot du jour</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Random')}>
                      <View style={styles.buttonRandom}>
                        <Text style={styles.buttonText}>Mot aléatoire</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onPressButton}>
                      <View style={styles.buttonNote}>
                        <Text style={styles.buttonText}>Noter l'application</Text>
                      </View>
                    </TouchableOpacity>
                </View>

            </View>
         );
    }//render();

}//Class()


 
const styles = StyleSheet.create({

    container:
    {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'stretch',
        flexWrap: 'nowrap',

    },

    input: {
        height: 50,
        width:width-90,
        marginBottom: 10,
        paddingHorizontal: 10
    },

    row:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        borderBottomColor: '#E8E8E8', 
        borderBottomWidth: 1, 
        marginHorizontal:15,
        height:50
    },

    rowText:{
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        lineHeight:20,

    },

    buttonDay: {
        alignItems: 'center',
        backgroundColor: '#ffa64d',
        alignItems: 'stretch',
    },

    buttonRandom: {
        alignItems: 'center',
        backgroundColor: '#5DBCD2',
        alignItems: 'stretch'
    },

    buttonNote: {
        alignItems: 'center',
        backgroundColor: '#53c68c',
        alignItems: 'stretch'
    },

    buttonText: {
        textAlign: 'center',
        padding: 30,
        color: 'white',
        fontSize: 20,
        fontWeight : 'bold',

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


