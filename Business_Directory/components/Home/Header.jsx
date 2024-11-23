import { View, Text, Image,TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  //get currently logged in user
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
      }}
    >
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text style={{fontWeight:'600',fontFamily:'outfit',color:'#d8d8d8'}}>Welcome</Text>
          <Text style={{fontSize:19,fontFamily:'outfit-medium',color:'#fff'}}>{user?.fullName}</Text>
        </View>
      </View>
      {/* Search bar */}
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        marginVertical:10,
        marginTop:15,
        gap:10,
        borderRadius:8
      }}>
      <Ionicons style={{paddingLeft:7,color:Colors.PRIMARY}} name="search-outline" size={24} color="black" />
      <TextInput placeholder="Search..." 
      style={{
        fontFamily:'outfit',
        display:'flex',
      }}/>
      </View>
    </View>
  );
}
