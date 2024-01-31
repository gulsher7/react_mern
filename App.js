
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import axios from 'axios';

// Function to encode form data
const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};


const App = () => {

 
const sendData = async () => {
  // Define your data
  const data = new URLSearchParams();
  data.append('Username', 'NHLAMULOL');
  data.append('Password', 'Camelsa@123');
  data.append('grant_type', 'password');

  try {
    // Make a POST request using Axios
    const response = await axios.post('http://156.38.213.42:7003/token', data.toString(), {
      headers: {   
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Error:', error);
  }
};


  useEffect(() => {

    sendData()

  }, [])
  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
