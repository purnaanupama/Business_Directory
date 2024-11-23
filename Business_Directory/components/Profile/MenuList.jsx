import { View, Text, Image, FlatList, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


export default function MenuList() {
 const router = useRouter();
 const {signOut}=useAuth()
 const menuList=[
    {
        id:1,
        name:'Add Business',
        icon:require('../../assets/images/add.png'),
        path:'/business/add-business'
    },
    {
        id:2,
        name:'My Business',
        icon:require('../../assets/images/business-and-trade.png'),
        path:'/business/mybusiness'
    },
    {
        id:3,
        name:'Share App',
        icon:require('../../assets/images/share_1.png'),
        path:'share'
    },
    {
        id:4,
        name:'Logout',
        icon:require('../../assets/images/logout.png'),
        path:'logout'
    },
   ]
 const onMenuPress=(item)=>{
  if(item.path=='logout'){
    signOut()
    return;
  }
  if(item.path=='share'){
    Share.share({
      message:'Download the Business Directory App by Purna Anupama'
    })
    return;
  }
    router.push(item.path)
   }

  return (
    <View style={{
        marginHorizontal:10
    }}>
      <FlatList 
      data={menuList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity
           onPress={()=>onMenuPress(item)}
            style={{
            backgroundColor:'#fff',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            flex:1,
            paddingVertical:35,
            paddingHorizontal:15,
            borderRadius:15,
            borderColor:'#fff',
            borderWidth:1,
            margin:10
        }} key={index}>
            <Image 
              source={item.icon}
              style={{
              width:50,
              height:50
            }}/>
            <Text style={{
                flex:1,
                fontFamily:'outfit-medium',
                fontSize:16
            }}>{item.name}
            </Text>
        </TouchableOpacity>
  )}
      />
      <Text style={{
        fontFamily:'outfit',
        textAlign:'center',
        marginTop:50,
        color:Colors.GRAY
      }}>
        Developed By Purna Anupama @ 2024
      </Text>
    </View>
  )
}