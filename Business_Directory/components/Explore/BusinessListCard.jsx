import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
  const router = useRouter()
  return (
    <TouchableOpacity
    onPress={()=>router.push(`/businessdetail/${business?.id}`)}
    style={{
    marginHorizontal:20,
    marginVertical:10,
    backgroundColor:'#fff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    }}>
      <Image source={{uri:business.imageURL}} style={{
        width:'100%',
        height:150,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
      }}/>
      <View style={{
        padding:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}>{business?.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}