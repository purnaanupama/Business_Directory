import { View, Text,TextInput,TouchableOpacity, ToastAndroid,Image } from 'react-native'
import React,{useState} from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/FireBaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Reviews({business}){
    const [rating,setRating]=useState(4)
    const [userInput,setUserInput]=useState()
    const {user}=useUser();

    const HandleSubmit=async()=>{
        const docRef=doc(db,'BusinessList',business?.id)
        const newDoc = await updateDoc(docRef,{
            reviews:arrayUnion({
                rating:rating,
                comment:userInput,
                userName:user?.fullName,
                userImage:user?.imageUrl,
                userEmail:user?.primaryEmailAddress?.emailAddress
            })
        })
        console.log(newDoc);
        ToastAndroid.show('Comment Added Successfully !',ToastAndroid.BOTTOM)
    }
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>Reviews</Text>

      <View>
      <Rating
        showRating={false}
        onFinishRating={(rating)=>setRating(rating)}
        style={{ paddingVertical: 10 }}
        imageSize={25}
       />
       <TextInput
        placeholder='Write your comment'
        numberOfLines={4}
        onChangeText={(value)=>setUserInput(value)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:10,
            borderColor:Colors.GRAY,
            textAlignVertical:'top',
            marginTop:20,
            marginBottom:10
        }}
        />
        <TouchableOpacity 
        disabled={!userInput}
        onPress={()=>HandleSubmit()}
        style={{
            padding:10,
            backgroundColor:Colors.PRIMARY,
            borderRadius:6,
            
        }}>
           <Text style={{
            fontFamily:'outfit',
            color:'#fff',
            textAlign:'center'
           }}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        {business?.reviews?.map((item,index)=>(
          <View key={index} style={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItems:'center',
            padding:10,
            borderWidth:1,
            borderColor:Colors.GRAY,
            borderRadius:15,
            marginTop:10
          }}>
            <Image source={{uri:item.userImage}}
            style={{
              width:50,
              height:50,
              borderRadius:99
            }}/>
            <View style={{
              display:'flex',
              gap:5
            }}>
              <Text style={{
                fontFamily:'outfit-medium',
              }}>{item.userName}</Text>
              <Rating
               style={{alignItems:'flex-start'}}
               imageSize={20}
               ratingCount={item.rating}
       />
              <Text>{item.comment}</Text>
            </View>
          </View>
   
        ))}
      </View>
    </View>
  )
}