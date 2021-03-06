import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

export default class CardItem extends React.Component {
  // If card has power and toughness return this score
  _displayStats () {
    const card = this.props.card;
    if (card.power && card.toughness) {
      return <Text style={styles.stats_text}>{card.power}/{card.toughness}</Text>;
    } else if (card.loyalty) {
      return <Text style={styles.stats_text}>{card.loyalty}</Text>;
    } else {
      return null;
    }
  }

  // Change the number of oracle line according to card type
  _isCreature () {
    const card = this.props.card;
    if (card.power || card.toughness || card.loyalty) {
      return 7;
    }
    return 9;
  }

  // Control uris of card and return image or gray rectangle
  _displayImage () {
    const card = this.props.card;
    if (card.image_uris && card.image_uris.small) {
      return <Image style={styles.image} source={{ uri: card.image_uris.small }} />;
    } else {
      return (
        <View style={styles.missing_image}>
          <Text>Missing image</Text>
        </View>
      );
    }
  }

  render () {
    const card = this.props.card;
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => this.props.goToCardDetails(card)}>
        {/* <Image style={styles.image} source={{uri : card.image_uris.small}} /> */}
        {this._displayImage()}
        <View style={styles.data_container}>

          <View style={styles.header_container}>
            <Text style={styles.name_text} numberOfLines={2}>{card.name}</Text>
            <Text>{card.mana_cost}</Text>
          </View>

          <View style={styles.description_container}>
            <Text style={styles.type_text} numberOfLines={1}>{card.type_line}</Text>
            {/* if card hasn't power score, allows more oracle text  */}
            <Text style={styles.oracle_text} numberOfLines={this._isCreature()}>{card.oracle_text}</Text>
            {this._displayStats()}
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  goToCardDetails: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  main_container: {
    height: 214,
    flexDirection: 'row'
  },
  image: {
    width: 146,
    height: 204,
    margin: 5
  },
  missing_image: {
    width: 146,
    height: 204,
    margin: 5,
    backgroundColor: '#DDDDDD'
  },
  missing_text: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  data_container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    margin: 5
  },
  header_container: {
    flexDirection: 'row'
  },
  name_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingBottom: 5
  },
  description_container: {
    flex: 1
  },
  type_text: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 3
  },
  oracle_text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'justify'
  },
  stats_text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
  }
});
