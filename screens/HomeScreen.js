import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import teams from '../teams';
const KEYS_TO_FILTERS = ['team', 'league'];

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Text style={{paddingLeft:15,color:'#fff',fontSize:20,fontWeight:'bold'}}>Acca Builder</Text>,
      headerRight: <TouchableOpacity activeOpacity={1} onPress={navigation.getParam('clear')}><Text style={{paddingRight:15,color:'#fff'}}>Clear All</Text></TouchableOpacity>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#029e70',
      },
    }
  };

  constructor(props){
    super(props);
    this.state = {
      teams: [],
      text: '',
      modalVisible: false,
      searchTerm: '',
    };
    this._addTeam = this._addTeam.bind(this);
    this._removeTeam = this._removeTeam.bind(this);
    this._clearTeams = this._clearTeams.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ clear: this._clearTeams });
  }

  _clearTeams() {
    this.setState({
      teams: []
    });
  }

  _removeTeam(index,item) {
		var array = [...this.state.teams]; // make a separate copy of the array
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({
				teams: array
			});
		}
	}

  _addTeam(team) {
    this.setState({
      teams: [...this.state.teams, team],
      searchTerm: '',
    });
    // Feedback that team has been added to list
    ToastAndroid.show(team.team+" have been added.", ToastAndroid.SHORT);
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      searchTerm: '',
    });
  }

  _shuffleArray() {
    var shuffle = require('shuffle-array');
    var shuffledTeams = shuffle(this.state.teams);
    this.setState({
      teams: shuffledTeams,
    });
  }

  listEmpty() {
    return (
      <View style={styles.noTeams}>
        <Text style={styles.noTeamsText}>No Teams</Text>
      </View>
    )
  }

  render() {
    const filteredTeams = teams.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <View style={styles.container}>

        <TouchableHighlight
          style={styles.fakeInput}
          underlayColor="#fff"
          activeOpacity={1}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.fakeInputText}>Add Some Teams</Text>
        </TouchableHighlight>

        <ScrollView style={styles.scrollView}>
          <View>
            <FlatList
              data={this.state.teams}
              extraData={this.state}
              keyExtractor={(item, index) => 'list-item-'+index }
              ListEmptyComponent={this.listEmpty}
              renderItem={({item, separators, index}) => (
                <View
                  style={styles.listItem}
                  key={item}>
                  <View>
                    <Text style={styles.listItemText}>{index+1} {item.team}</Text>
                    <Text style={styles.teamLeague}>{item.league}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonRemoveContainer}
                    activeOpacity={1}
                    onPress={
                      this._removeTeam.bind(index,item)
                    }>
                    <Text style={styles.buttonRemove}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </ScrollView>

        <TouchableHighlight
          style={styles.button}
          underlayColor="#03ac7a"
          activeOpacity={1}
          onPress={() => {
            this._shuffleArray();
          }}>
          <Text style={styles.buttonText}>BUILD MY ACCA</Text>
        </TouchableHighlight>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.searchContainer}>
              <View style={styles.searchContainerInner}>
                <View style={styles.searchBarContainer}>
                  <SearchInput
                    style={styles.searchBar}
                    ref={component => this.searchInput = component}
                    placeholder="Search teams..."
                    value={this.state.searchTerm}
                    onChangeText={(searchTerm) => {
                      this.searchUpdated(searchTerm)
                    }}/>
                </View>

                <View style={styles.cancelButton}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <ScrollView>
              {filteredTeams.map(team => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={team.id}
                    onPress={this._addTeam.bind(this,team)}>
                    <View style={styles.teamItem}>
                      <Text style={styles.teamName}>{team.team}</Text>
                      <Text style={styles.teamLeague}>{team.league}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    marginBottom: 10,
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  fakeInput: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  fakeInputText: {
    color: '#ccc'
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#029e70',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 10,
    paddingBottom: 20,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listItemText: {
    color: '#000',
    fontSize: 18,
  },
  buttonRemoveContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRemove: {
    color: '#000',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  searchContainer: {
    marginBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  searchContainerInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    flexGrow: 1,
  },
  searchBar: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  cancelButton: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
  teamItem: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  teamName: {
    fontSize: 18
  },
  teamLeague: {
    fontSize: 12,
    color: '#ccc'
  },
  noTeams: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  noTeamsText: {
    fontSize: 18
  }
});