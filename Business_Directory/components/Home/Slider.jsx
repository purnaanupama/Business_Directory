import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'

export default function Slider() {

const [sliderList, setSliderList] = useState([]);

useEffect(()=>{
        GetSliderList();
    },[])

const GetSliderList=async()=>{
    setSliderList([])
    const q = query(collection(db,'Slider'))
    const querySnapshot= await getDocs(q)
    querySnapshot.forEach((doc)=>{  
       setSliderList(prev=>[...prev,doc.data()])
    })
}
  return (
    <View>
       <Text style={{fontFamily:'poppins-extra-bold',fontSize:20,paddingHorizontal:20,paddingVertical:10}}>
        Special for you
       </Text>
       <FlatList
          data={sliderList}
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft:15,marginRight:15}}
          horizontal={true}
          renderItem={({item,index})=>(
            <Image source={{uri:item.imageURL}}
            style={{
                width:300,
                height:160,
                borderRadius:15,
                marginRight:15,
            }}/>
          )}
       />


    </View>
  )
}