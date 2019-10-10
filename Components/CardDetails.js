import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { connect } from 'react-redux';

class CardDetails extends React.Component {

    // Verify if card uris exist and display card
    _displayCard() {
        const card = this.props.navigation.getParam('card');

        if(card.image_uris && card.image_uris.png) {
            return <Image style={styles.image} source={{uri: card.image_uris.png}}/>
        }
        else {
            return <Text style={styles.missing_text}>Missing Image</Text>
        }
    }

    _testButton = () => {
        console.log("Favorite button pressed !!!");
    }
    
    render() {
        console.log(this.props);
        const card = this.props.navigation.getParam('card');
        return(
            <View style={styles.main_container}>
                {/* {this._displayCard()} */}
                <Button title='Toggle Favorite' onPress={() => this._testButton()}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CardDetails);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#2a2b2b',
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
        margin: 5,
    },
    missing_text: {
        flex: 1,
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})