import React, { Component, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import { Colors } from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import Category from '../../components/Home/Category'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';


export default function explore(){

  const [businessList,setBusinessList]=useState([])
   
  const getBusinessByCategory=async(category)=>{
    setBusinessList([])
    const q=query(collection(db,'BusinessList'),(where("category","==",category)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
        setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}]) 
    })
  }
    return (
      <View style={{
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          marginHorizontal:20,
          marginTop:35,
          fontSize:30
        }}>Explore More</Text>
        {/*Search Bar*/}
        <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        marginHorizontal:20,
        marginVertical:20,
        marginTop:15,
        gap:10,
        borderRadius:8,
        borderColor:Colors.PRIMARY,
        borderWidth:1
      }}>
      <Ionicons style={{paddingLeft:7,color:Colors.PRIMARY}} name="search-outline" size={24} color="black" />
      <TextInput placeholder="Search..." 
      style={{
        fontFamily:'outfit',
        display:'flex',
      }}/>
      </View>
        {/*Category*/}
        <Category explore={true} onCategorySelect={(category)=>getBusinessByCategory(category)}/>
        <View style={{
          width:100,
          height:10,
        }}></View>
        {/*Business List*/}
        <ExploreBusinessList businessList={businessList}/>
      </View>
    )
  }

