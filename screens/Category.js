import React, { useState, useEffect } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,  Divider, Pressable,  ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { ImageBackground } from 'react-native';
import app from "../src/utils/firebase";
import { getFirestore, collection, getDocs } from "@firebase/firestore";


const Categories = () => {
const navigation = useNavigation();
const [categories, setCategories] = useState([])
useEffect(() => {
  const db = getFirestore(app)
  const categoriesCol = collection(db, "categories")
  getDocs(categoriesCol)
    .then(snapshot => setCategories(snapshot.docs.map(doc => doc.data())))
},[])
return (
<NativeBaseProvider>
  <ImageBackground source={require('../assets/bg.jpg')} style={{flex: 1}} >
    <Center flex={1}>
      <Box >
        <ScrollView>
          <Box alignItems="center">
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Box marginTop={100} marginLeft={5}>
                    <Heading color="white" bold size="xl">Kategori</Heading>
                    <Text color='white' fontSize="lg">Berikut adalah kategori produk yang ada</Text>
                </Box>
              </AspectRatio>  
            </Box>
          </Box>
          <Box rounded="3xl" _light={{backgroundColor: "white"}}>    

            <Stack p="4" space={30}>
              <Stack space={2}>
                <Center>
                  <Text fontSize="xl" marginBottom={4} color="#43270f" bold>
                    category
                  </Text>
                  <Divider />
                </Center>

                <Box style={{
                  flex: 1, 
                  flexDirection: "row", 
                  alignItems: "center", 
                  columnGap: 20,
                  rowGap: 20,
                  justifyContent: "center", 
                  flexWrap: "wrap",
                }}> 
                  { categories.length > 0 ?
                    categories.map((data, index) => (
                      <Center key={index}>
                        <Pressable onPress={() => navigation.navigate("CategoryProduct", {category: data.name})}>
                          <Image size={120} borderRadius={100} source={{uri: data.img}} alt="Alternate Text"/>
                        </Pressable>
                      </Center>
                    ))
                    :
                    <Box style={{width: 257, flex: 1, justifyContent: "center", marginTop: 50, marginBottom: 50}}>
                      <ActivityIndicator size="large" color="#F1AA7B" />
                    </Box>
                  }
                </Box>
              </Stack>
            </Stack>
          </Box>
        </ScrollView>
      </Box>
    </Center>
  </ImageBackground>
</NativeBaseProvider>
);
 
};

 export default Categories