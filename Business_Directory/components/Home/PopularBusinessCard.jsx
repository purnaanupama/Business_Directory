import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PopularBusinessCard({business}) {
  const router = useRouter()
  return (
    <TouchableOpacity 
    onPress={()=>router.push(`/businessdetail/${business?.id}`)} 
    style={{
        marginLeft:15,
        padding:10,
        backgroundColor:'#fff',
        borderRadius:15
    }}>
      <Image source={{uri:business.imageURL}} style={{
        width:200,
        height:130,
        borderRadius:13
      }}/>
      <View style={{marginTop:7,display:'flex',gap:5}}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:17,
        }}>{business.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:13,
            color:Colors.GRAY
        }}>{business.address}</Text>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{display:'flex',flexDirection:'row',gap:5}}>
            <Image style={{width:15,height:15}} source={{uri:`https://res.cloudinary.com/de6oikiqv/image/upload/v1728929571/star_uqlucm.png`}}></Image>
            <Text style={{fontFamily:'outfit'}}>4.5</Text>
        </View>
        <Text style={{
            fontFamily:'outfit',
            backgroundColor:Colors.PRIMARY,
            color:'#fff',
            paddingHorizontal:10,
            paddingVertical:5,
            borderRadius:8,
            marginTop:4,
            width:120,
            fontSize:12,
            textAlign:'center'
        }}>{business.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}