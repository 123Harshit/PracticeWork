import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Content, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

const App = ({navigation}) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  const [otp, setOtp] = useState([]);
  const otpTextInput = []

  

  const renderInputs= () => {
    const inputs = Array(6).fill(0);
    const txt = inputs.map(
        (i, j) => <Col key={j} style={styles.txtMargin}><Item regular>
            <Input
                style={[styles.inputRadius, { borderRadius: 10 }]}
                keyboardType="numeric"
                onChangeText={v => focusNext(j, v)}
                onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
                ref={ref => otpTextInput[j] = ref}
            />
        </Item></Col>
    );
    return txt;
}

const focusPrevious=(key, index)=> {
    if (key === 'Backspace' && index !== 0)
        otpTextInput[index - 1]._root.focus();
}

const focusNext= (index, value) =>{
    if (index < otpTextInput.length - 1 && value) {
        otpTextInput[index + 1]._root.focus();
    }
    if (index === otpTextInput.length - 1) {
        otpTextInput[index]._root.blur();
        navigation.navigate('PaymentScreen')
    }
    const otpm = otp;
    otpm[index] = value;
    setOtp({ otpm });
}
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          {showMessage && (
            <View style={styles.message}>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? "true" : "false"}</Text>
            </View>
          )}
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >
            <Text>Check</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <Content padder>
                <Grid style={styles.gridPad}>
                    {renderInputs()}
                </Grid>
            </Content>
    </>
  );
};
const styles = StyleSheet.create({
  button:{
    borderColor:'black',
    borderWidth:5
  }
})
export default App;


// import React, { Component } from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import OTPInputView from '@twotalltotems/react-native-otp-input'

// class DashboardScreen extends Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text>Dashboard Screen</Text>
//                 <OTPInputView
//                     pinCount={4}
//                 />
//             </View>
//         )
//     }
// }

// export default DashboardScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//       borderStyleBase: {
//         width: 30,
//         height: 45
//       },
     
//       borderStyleHighLighted: {
//         borderColor: "#03DAC6",
//       },
     
//       underlineStyleBase: {
//         width: 30,
//         height: 45,
//         borderWidth: 0,
//         borderBottomWidth: 1,
//       },
     
//       underlineStyleHighLighted: {
//         borderColor: "#03DAC6",
//       },
// })