import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { Font } from 'expo';

export default class HomeScreen extends React.Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Lobster-Regular': require('./assets/fonts/Lobster/Lobster-Regular.ttf'),
      'Roboto-Condensed': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }
  render() {
  const handlePress = () => false
	return (
      //<App/>
      <View style={styles.container}>
        {
        this.state.fontLoaded ? (
        <Text style={styles.title}>Sunflower</Text>
        ) : null
        }
        {
        this.state.fontLoaded ? (
        <Text style={styles.description}>Snap a picture of a flower to learn it's meaning!</Text>
        ) : null
        }
        <View style={styles.buttonMargin}>
          <Button title="START" onPress={() =>
            this.props.navigation.navigate('Camera')
          } color='green'/>
        </View>
        <View style={styles.buttonMargin}>
          <Button title="VIEW FLOWERS" onPress={handlePress} color='green' style={styles.button}/>
        </View>
        <View style={styles.buttonMargin}>
          <Button title="MAKE BOUQUET" onPress={handlePress} color='green' style={styles.button}/>
        </View>
        
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
  	fontSize: 72,
    padding: 10,
  	color: '#ffcc02',
    marginTop: 80,
    fontFamily: 'Lobster-Regular'
  },

  description: {
  	fontSize: 24,
    padding: 30,
    textAlign: 'center',
  	color: '#ffcc02',
    fontFamily: 'Roboto-Condensed'
  },
  buttonContainer: {
    // flex: 1,
    // justifyContent:'center',
    // alignItems: 'center'
  },
  buttonMargin: {
    marginTop: 30,
  },
});
