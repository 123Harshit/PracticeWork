import { View, Text, TouchableHighlight, Button, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios'

class PaymentScreen extends Component {
    state={
        amount:'',
        currency:'',
        id:''
    }
    
    render() {
        payment_step = async() =>{
            await axios({
                url:'http://ce1196a0fae1.ngrok.io/razorpay',
                method:'post',
            }).then(response=>{
                this.setState({
                    amount: response.data.amount.toString(),
                    currency: response.data.currency,
                    id: response.data.id
                })
            })
            console.log(this.state.id)
        }
        pressed = () =>{
            axios.get(`http://ce1196a0fae1.ngrok.io/`).then(function(response){        //will have to use ngrok
                console.log(response.data)
            }).catch(function(err){
                console.log(err.response);
            })
        }
        return (
            <View>
                <Text>Payment Screen</Text>
                <Button style={styles.button} onPress={pressed} title="Press Me"/>
                <Button style={styles.button} onPress={payment_step} title="Getting Order Id"/>
                <TouchableHighlight onPress={() => {
                    console.log(this.state.id)
                    var options = {
                        description: 'Credits towards consultation',
                        image: 'https://i.imgur.com/3g7nmJC.png',
                        currency: this.state.currency,
                        key: 'rzp_test_fVVAcOvLVBLvnB', // Your api key
                        amount: this.state.amount,
                        name: 'foo',
                        order_id:this.state.id,
                        prefill: {
                            email: 'void@razorpay.com',
                            contact: '9191919191',
                            name: 'Razorpay Software'
                        },
                        theme: {color: '#F37254'}
                    }
                    RazorpayCheckout.open(options).then((data) => {
                        // handle success
                        alert(`Success: ${data.razorpay_payment_id}`);
                        console.log("Payment recieved")
                    }).catch((error) => {
                        // handle failure
                        alert(`Error: ${error.code} | ${error.description}`);
                    });
                    }}>
                        <Text>Wait for the Payment</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default PaymentScreen

const styles = StyleSheet.create({
    button:{
        borderColor:'black',
    }
})