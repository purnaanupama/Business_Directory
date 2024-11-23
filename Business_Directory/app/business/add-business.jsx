import { View, Text, Image,TextInput, TouchableOpacity,ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db, storage } from '../../config/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native';

export default function AddBusiness() {
  const navigation=useNavigation()
  const {user} = useUser();
  const [categoryList,setCategoryList]=useState([])
  const [image,setImage]=useState(null)
  useEffect(()=>{
   navigation.setOptions({
    headerTitle:'Add New Business',
    headerShown:true
   })
   GetCategoryList();
  },[])

  const [name,setName]=useState();
  const [address,setAddress]=useState();
  const [contact,setContact]=useState();
  const [website,setWebsite]=useState();
  const [about,setAbout]=useState();
  const [category,setCategory]=useState();
  const [loading,setLoading]=useState(false);

   
   const onImagePress=async()=>{
       // No permissions request is necessary for launching the image library
       let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      setImage(result?.assets[0].uri)
      console.log(result);  
   }

   const GetCategoryList=async()=>{
    setCategoryList([])
    const q=query(collection(db,'Category'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
      setCategoryList(prev=>[...prev,{
         label:(doc.data()).name,
         value:(doc.data()).name
      }])
    })
    console.log(categoryList);
   }

   const onAddressBusiness=async()=>{
    setLoading(true)
    const fileName=Date.now().toString()+".jpg";
    const resp=await fetch(image);
    const blob =await resp.blob();
    const imageRef=ref(storage,'business-app/'+fileName);
    uploadBytes(imageRef,blob).then((snapshot)=>{
      console.log("File Uploaded...");
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        saveBusinessDetail(downloadUrl)
      })
    })
    setLoading(false)
   }

   const saveBusinessDetail=async(imageUrl)=>{
    await setDoc(doc(db,'BusinessList',Date.now().toString()),{
      name:name,
      address:address,
      contact:contact,
      about:about,
      website:website,
      category:category,
      username:user?.fullName,
      useremail:user?.primaryEmailAddress.emailAddress,
      userImage:user?.imageUrl,
      imageURL:imageUrl
    })
    setLoading(false)
    ToastAndroid.show('New business Added...',ToastAndroid.LONG)
   }
  return (
    <ScrollView style={{
      padding:20,
      height:100
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>Add Business</Text>
      <Text style={{
         fontFamily:'outfit',
         color:Colors.GRAY
      }}>Fill the below form to add new business</Text>
      <TouchableOpacity 
      style={{padding:20}}
      onPress={()=>onImagePress()}>
      {!image?<Image source={require('./../../assets/images/placeholder.png')}
         style={{width:100, height:100}}/>:
              <Image source={{uri:image}}
         style={{width:200, height:200, borderRadius:15}}/>
         }
      </TouchableOpacity>
      <View style={{
        display:'flex',
        gap:15
      }}>
        <TextInput placeholder='Name'
        onChangeText={(v)=>setName(v)}
        style={{
          fontFamily:'outfit',
          backgroundColor:'#fff',
          padding:15,
          borderColor:Colors.GRAY,
          borderWidth:1,
          borderRadius:5
        }}></TextInput>

        <TextInput placeholder='Address'
        onChangeText={(v)=>setAddress(v)}
        style={{
          fontFamily:'outfit',
          backgroundColor:'#fff',
          padding:15,
          borderColor:Colors.GRAY,
          borderWidth:1,
          borderRadius:5
        }}></TextInput>

        <TextInput placeholder='Contact'
        onChangeText={(v)=>setContact(v)}
        style={{
          fontFamily:'outfit',
          backgroundColor:'#fff',
          padding:15,
          borderColor:Colors.GRAY,
          borderWidth:1,
          borderRadius:5
        }}></TextInput>

        <TextInput placeholder='Website'
        onChangeText={(v)=>setWebsite(v)}
        style={{
          fontFamily:'outfit',
          backgroundColor:'#fff',
          padding:15,
          borderColor:Colors.GRAY,
          borderWidth:1,
          borderRadius:5
        }}></TextInput>

        <TextInput placeholder='About'
        onChangeText={(v)=>setAbout(v)}
        multiline
        numberOfLines={5}
        style={{
          fontFamily:'outfit',
          backgroundColor:'#fff',
          textAlignVertical:'top',
          padding:15,
          borderColor:Colors.GRAY,
          borderWidth:1,
          borderRadius:5,
          height:150
        }}></TextInput>
    <View style={{
       fontFamily:'outfit',
       backgroundColor:'#fff',
       textAlignVertical:'top',
       borderColor:Colors.GRAY,
       borderWidth:1,
       borderRadius:5,
    }}>
    <RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      items={categoryList}/>
    </View>
    <TouchableOpacity 
      disabled={loading}
      onPress={()=>onAddressBusiness()}
      style={{
      paddingVertical:14,
      backgroundColor:Colors.PRIMARY,
      borderRadius:5,
      marginTop:10
    }}>
      {loading?
      <ActivityIndicator size={'large'} color={'#fff'}/>:  
      <Text style={{
        textAlign:'center',
        color:'#fff',
        fontFamily:'outfit'
      }}>
       Add New Business
      </Text>}
    </TouchableOpacity>
      </View>
      <View style={{
        height:80
      }}>

      </View>
    </ScrollView>
  )
}