import { View, Text,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'
import PopularBusinessCard from './PopularBusinessCard'

export default function BusinessList() {
const [businessList,setBusinessList]=useState([]);

    const GetBusinessList=async()=>{
        setBusinessList([])
        const q=query(collection(db,'BusinessList'),limit(10))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
    } 
    useEffect(()=>{
        GetBusinessList()
    },[]) 
  return (
    <View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingRight:15,
            paddingVertical:5}}>
        <Text style={{
         paddingLeft:20,
         marginBottom:10,
         marginTop:10,
         fontSize:20,
         fontFamily:'outfit-medium',
         }}>Popular Business 
         </Text>
         <Text style={{marginTop:10,color:Colors.GRAY,fontFamily:'outfit'}}>View All</Text>
        </View>
        <FlatList
        style={{marginRight:15}}
         data={businessList}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({item,index})=>(
            <View>
                <PopularBusinessCard 
                business={item}
                key={index}/>
            </View>
         )}
        >
            
        </FlatList>
    </View>
  )
}