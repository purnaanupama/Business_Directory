import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import {collection, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig';
import BusinessCard from '../../components/BusinessList/BusinessCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
  const navigation=useNavigation();
  const {category}=useLocalSearchParams();
  const [businessList1,setBusinessList1]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
     navigation.setOptions({
        headerShown:true,
        headerTitle:category,
        headerTitleStyle: {
          fontFamily: 'outfit', // Replace with your font family
        },
     })
  },[]);
  


  // Get the business list for each category
  const getBusinessList=async()=>{
     setLoading(true)
     setBusinessList1([])
     const q=query(collection(db,'BusinessList'),where("category","==",category))
     const querySnapshot=await getDocs(q);
     querySnapshot.forEach((doc)=>{
      setBusinessList1(prev=>[...prev,{id:doc?.id,...doc.data()}])
     })
     setLoading(false)

  }

  useEffect(()=>{
    getBusinessList()
  },[])


  return (
    <View>
      {businessList1?.length>0 && loading===false?
      <FlatList
        onRefresh={getBusinessList}
        refreshing={loading}
        style={{marginTop:10}}
        data={businessList1}
        renderItem={({item,index})=>(
         <View>
         <BusinessCard business={item} key={index}/>
         </View>
      )}
      />
      :
      loading?<ActivityIndicator
      size={'large'}
      color={Colors.PRIMARY}
      marginTop={100}
      /> : 
        <Text style={{
          fontSize:20,
          marginTop:100,
          textAlign:'center',
          fontFamily:'outfit-bold',
          color:Colors.GRAY
        }}>No Business Found</Text>
    }
     
    </View>
  )
}