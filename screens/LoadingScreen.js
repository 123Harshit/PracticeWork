import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

class LoadingScreen extends Component{
    componentDidMount(){
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn = () =>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user)
            {
                console.log(user)
                this.props.navigation.navigate('DashboardScreen')
            }
            else{
                this.props.navigation.navigate('LoginScreen')
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator color="#00ff00" size="large"/>
            </View>
        )
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})