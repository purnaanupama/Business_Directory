import React from 'react'
import { View, Text } from 'react-native'
import UserIntro from '../../components/Profile/UserIntro'
import { useUser } from '@clerk/clerk-expo'
import MenuList from '../../components/Profile/MenuList'


export default function profile() {
  const user = useUser()
  return (
   <View style={{
   }}>
    <Text style={{
      fontFamily:'outfit-bold',
      fontSize:30,
      marginHorizontal:20,
      marginTop:55,
      textAlign:'center'
    }}>
     Profile
    </Text>
       {/* user information */}
       <UserIntro/>
      {/* menu list */}
        <MenuList/>
   </View>
  )
}
