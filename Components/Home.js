import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { getCardsByDate } from '../Api/ScryfallApi';
import CardsList from './CardsList';
import PropTypes from 'prop-types';

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cards: [],
      isLoading: true
    };
  }

  // Call Scryfall Api and set cards state with result, after verify the Api response
  _loadCards () {
    getCardsByDate(1).then((responseJson) => {
      if (responseJson.object !== 'error') {
        this.setState({
          cards: responseJson.data,
          isLoading: false
        });
      }
    });
  }

  // Display activity indicator while Api doesn't return response
  _displayLoading () {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity_container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  }

  componentDidMount () {
    this._loadCards();
  }

  render () {
    return (
      <View style={styles.main_container}>
        <CardsList cards={this.state.cards} navigation={this.props.navigation}/>
        {this._displayLoading()}
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  activity_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error_text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
