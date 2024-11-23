import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { getDoc, doc} from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import Intro from '../../components/BusinessDetail/Intro';
import { Colors } from '../../constants/Colors';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
  const {businessid} = useLocalSearchParams();
  const [businessDetails,setBusinessDetails] = useState("")
  const [loading,setLoading]=useState(false)
  const navigation = useNavigation()



  useEffect(()=>{
    getBusinessDetailsById()
    },[])

  //get business details by id
  const getBusinessDetailsById =async()=>{
    setLoading(true)
    const docRef=doc(db,'BusinessList',businessid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        setBusinessDetails({id:docSnap.id,...docSnap.data()})
        setLoading(false) 
    }else{
        console.log("Document not found");
        setLoading(false)  
    }
  }
  
  useEffect(()=>{
    navigation.setOptions({
       headerShown:false,
       headerTitle:businessDetails?.name,
       headerTitleStyle: {
         fontFamily: 'outfit', // Replace with your font family
       },
    })
   },[businessDetails]);

  return (
    <ScrollView>
      {loading ? <ActivityIndicator
         size={'large'}
         color={Colors.PRIMARY}
         marginTop={100}
      />:
      <View>
    {/*Business intro*/}
      <Intro business={businessDetails}/>
    {/*Action buttons*/}
      <ActionButton business={businessDetails}/>
    {/*About section*/}
      <About business={businessDetails}/>
    {/*Review section*/}
      <Reviews business={businessDetails}/>
      </View>}
    </ScrollView>
  )
}