import { View, Text,Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    const {user} = useUser()
  return (
    <View style={{
        display:'flex',
        marginTop:12,
        justifyContent:'center',
        alignItems:'center'}}>
      <Image source={{uri:user?.imageUrl}} 
        style={{
        height:100,
        width:100,
        borderRadius:99
      }}/>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        padding:10
      }}>{user?.fullName}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:16,
        marginBottom:30
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}