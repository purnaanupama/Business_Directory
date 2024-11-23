import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'



export default function Category({explore=false,onCategorySelect}) {

 const [CategoryList,setCategoryList]=useState([])
 const router = useRouter();

 useEffect(()=>{
    GetCategoryList()
 },[])

 const GetCategoryList=async()=>{
    setCategoryList([])
    const q=query(collection(db,'Category'));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
        setCategoryList(prev=>[...prev,doc.data()])
    })
 }
 const onCategoryPressHandler=(item)=>{
  if(!explore)
  {
    router.push(`/businesslist/${item.name}`)
  }
  else if(explore){
    onCategorySelect(item.name)
  }
 }

  return (
    <View>
      {!explore &&
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:15,
        paddingVertical:5}}>
      <Text style={{
        paddingLeft:20,
        marginTop:10,
        fontSize:20,
        fontFamily:'outfit-medium',
      }}>Category 
   </Text>
   <Text style={{marginTop:10,color:Colors.GRAY,fontFamily:'outfit'}}>View All</Text>
  </View>
      }
         <FlatList
         style={{marginLeft:15,marginTop:12}}
          data={CategoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index})=>(
            <CategoryItem category={item} key={index} 
            onCategoryPress={()=>onCategoryPressHandler(item)}/>
          )}
         />
    </View>
  )
}