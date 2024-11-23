import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessCard({business}) {
    const router=useRouter();
  return (
    <TouchableOpacity style={{
       padding:10,
       marginBottom:10,
       marginHorizontal:10,
       marginTop:5,
       borderRadius:15,
       backgroundColor:'#fff',
       display:'flex',
       flexDirection:'row',
       gap:15
    }}
    onPress={()=>router.push(`/businessdetail/${business.id}`)}
    >
      <Image source={{uri:business.imageURL}} style={{
        width:120,
        height:120,
        borderRadius:15
      }}/>
      <View style={{
        flex:1,
        gap:7
      }}>
        <Text style={{fontSize:20,fontFamily:'outfit-bold'}}>{business.name} </Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:15,
            color:Colors.GRAY
        }}>{business.address}</Text>
        <View style={{display:'flex',flexDirection:'row',gap:5}}>
            <Image style={{width:15,height:15}} source={{uri:`https://res.cloudinary.com/de6oikiqv/image/upload/v1728929571/star_uqlucm.png`}}></Image>
            <Text style={{fontFamily:'outfit'}}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}