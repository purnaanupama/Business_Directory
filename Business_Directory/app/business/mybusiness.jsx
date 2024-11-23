import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'
import  BusinessListCard  from '../../components/Explore/BusinessListCard'
import { useNavigation } from 'expo-router'

export default function MyBusiness() {
  const {user} =useUser()
  const navigation=useNavigation()
  const [loading,setLoading]=useState(false)
  const [businessList,setBusinessList]=useState([]);
  const GetUserBusiness=async()=>{
    setBusinessList([])
    setLoading(true)
    const q=query(collection(db,'BusinessList'),
    where('useremail','==',user?.primaryEmailAddress?.emailAddress));
    const querySnapshot= await getDocs(q)
    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
    setLoading(false)
  }
  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'My Business',
      headerShown:true
     })
    GetUserBusiness()
  },[])

  return (
    <ScrollView style={{
      
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        paddingHorizontal:20,
        paddingVertical:15,
        fontSize:30
      }}>My Business</Text>
      <FlatList
      data={businessList}
      onRefresh={GetUserBusiness}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListCard key={index} business={item}/>
      )}
      />
    </ScrollView>
  )
}