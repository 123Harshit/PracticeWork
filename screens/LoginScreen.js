import React, {useEffect, useState} from 'react'
import SocialButton from '../components/SocialButton';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native'

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId: '88304174696-hhdl2dlar54ub1gscbogtth8iuu3rn1c.apps.googleusercontent.com',
    });
  }, []);
  //...
  
  googleLogin = async () => {
    // Get the users ID token
    try{
      const { idToken } = await GoogleSignin.signIn();
    
    GoogleSignin.getTokens().then(res=>{
      console.log(res.accessToken)
    });
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);
    // Sign-in the user with the credential
    const value = auth().signInWithCredential(googleCredential);
    setUser(value);
    console.log(value);
    navigation.navigate('PaymentScreen');
    }catch{err=>{
      console.log(err);
    }}
  }

  googleSignOut = async () =>{
    try{
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }catch{error=>{
      console.log(error);
    }}
  }

  return (
    <View>
      
      
      <SocialButton 
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={googleLogin}
      />
      <SocialButton 
        buttonTitle="Sign Out"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={googleLogin}
      />
    </View>
  );
};
 
export default LoginScreen;

