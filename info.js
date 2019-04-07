import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { Font } from 'expo';

export default class InfoScreen extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Lobster-Regular': require('./assets/fonts/Lobster/Lobster-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('uri');
    console.log("hello");
    console.log(uri);
    const myModule = require('./api');
    let val = myModule.getResults(uri);
    
	return (
        <View style={styles.container}>
        {
            this.state.fontLoaded ? (
            <Text style={styles.title}>Flower Data</Text>
        ) : null
        }
        <Text style={styles.description}>{uri}</Text>
        
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#ffeca3'
  },
  title: {
  	fontSize: 48,
    padding: 10,
  	color: '#ffcc02',
    marginTop: 80,
    fontFamily: 'Lobster-Regular'
  },
   description: {
  	fontSize: 24,
    padding: 20,
    textAlign: 'center',
  	color: '#ffcc02',
  }
});
