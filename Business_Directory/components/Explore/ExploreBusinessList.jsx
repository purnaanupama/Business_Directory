import { View, Text,FlatList,ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'


export default function ExploreBusinessList({businessList}) {

  return (
    <ScrollView style={{
        marginTop:10
    }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={businessList}
        scrollEnabled={true}
        renderItem={({item,index})=>(
           <BusinessListCard 
           key={index} 
           business={item}/>
          )}
        />
        <View style={{
            height:150,
            marginBottom:140
        }}>
        </View>
    </ScrollView>
  )
}