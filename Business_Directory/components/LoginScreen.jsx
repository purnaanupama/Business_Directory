import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import {useWarmUpBrowser} from '../hooks/useWarmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <LinearGradient
    colors={['rgba(255, 255, 255, 1)', 'rgba(226, 206, 255, 1)']} // Gradient colors
    start={{ x: 0.5, y: 0 }} // Start point (top)
    end={{ x: 0.5, y: 1 }}   // End point (bottom)
    style={{ flex: 1 }}      // Ensure it covers the entire screen
  >
    <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <View style={styles.imageContainer}>
        <Image source={require('./../assets/images/login.png')}
         style={{
          width:220,
          height:450,
          borderRadius:20,
          borderWidth:6,
        }}
        />
      </View>
      <View style={styles.subContainer}>
          <Text style={{fontSize:30,fontFamily:'outfit-bold',textAlign:'center'}}>
            Your Ultimate 
            <Text style={{color:Colors.PRIMARY}}> Community Business Directory App</Text>
          </Text>
          <Text style={{
            fontSize:15,
            fontFamily:'outfit',
            textAlign:'center',
            marginVertical:15,
            color:Colors.GRAY
          }}>
            Find your desired business near you and post your own business to your community</Text>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
              <Text style={{color:'#fff',fontFamily:'outfit-bold'}}>Lets Get Started</Text>
            </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  subContainer:{
        backgroundColor:'#fff',
        padding:20,
        marginTop:-20,
        paddingBottom:250,

  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    width:220,
    height:450,
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10, // Ensures the shadow is also visible on Android
    backgroundColor: '#fff', // Add background color to the shadow container to make the shadow visible
    borderRadius: 20, // Match this with the image's borderRadius for consistent shadow
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    padding:16,
    display:'flex',
    alignItems:'center',
    width:200,
    margin:'auto',
    borderRadius:99
  }
})
