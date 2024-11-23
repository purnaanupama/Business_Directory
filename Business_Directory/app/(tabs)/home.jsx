import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import BusinessList from '../../components/Home/BusinessList'


export default function home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Category */}
      <Category/>
      {/* Popular Business List */}
      <BusinessList/>

      <View style={{
        height:90
      }}>

      </View>
  </ScrollView>
  )
}


