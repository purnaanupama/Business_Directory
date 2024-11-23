import { View,Text,Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Back from '@expo/vector-icons/Ionicons';
import Heart from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {
  const router = useRouter()
  const {user} = useUser()

  const onDelete=()=>{
    Alert.alert('Do you want to delete ?','Do you really want to delete this business ?',[{
      text:'Cancel',
      style:'cancel'
    },{
      text:'Delete',
      style:'destructive',
      onPress:()=>deleteBusiness()
    }
   ])
  }

  const deleteBusiness=async()=>{
    console.log("Delete business");
    await deleteDoc(doc(db,'BusinessList',business?.id))
    router.back()
    ToastAndroid.show('Business Deleted!',ToastAndroid.LONG)
  }

  return (
    <View>
      <View style={{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:30
      }}>
     <TouchableOpacity onPress={()=>router.back()}> 
      <Back name="arrow-back-circle" size={30} color="white" />
      </TouchableOpacity>
      <Heart name="heart-outline" size={30} color="white" />
      </View>
      <Image source={{uri:business.imageURL}}
       style={{
        width:'100%',
        height:340
       }}
      />
      <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'}}>
        <Text style={{
         fontFamily:'outfit-bold',
         fontSize:26
       }}>{business.name}</Text>
       {user?.primaryEmailAddress?.emailAddress === business.useremail &&
      <TouchableOpacity onPress={()=>onDelete()}>
      <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
       }
        </View>
        <Text style={{
         fontFamily:'outfit-medium',
         fontSize:16,
         color:Colors.GRAY
       }}>{business.address}</Text>
      </View>
    </View>
  )
}