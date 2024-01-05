import { Heading, Image, Text, FlatList, Button, Input, Icon, Ionicons,  HStack, AspectRatio, Center, Pressable  } from "native-base";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { ImageBackground } from 'react-native';
import { useState, useEffect } from "react";
import app from "../src/utils/firebase";
import { getFirestore, collection, getDocs, query, where } from "@firebase/firestore";

const CategoryProduct = ({route}) => {
  const {category} = route.params
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])

  useEffect(() => {
    const db = getFirestore(app)
    getDocs(query(collection(db, "products"), where("category", "==", category)))
      .then(snapshot => {setProducts(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));setDisplayedProducts(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));setIsLoading(false)})
  },[])

  const searching = (text) => {
    setDisplayedProducts(products.filter(item => item.name.match(new RegExp("^" + text + ".*$"))))
  }

  const renderitem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Transaction", {id: item.id, name: item.name, jumlah: item.qty})}>
        <Box
          p={"4"}
          borderBottomWidth={1}
          flexDirection="row"
          flex={1}
          rounded="xl"
        >
          <Box flex={1} mr={"4"} rounded="xl">
            <Image
              source={{ uri: item.img }}
              w="full"
              h="full"
              alt="Image Data"
            />
          </Box>
          <Box flex={1.8} rounded="xl" >
            <Heading lineHeight={"md"} fontSize={"md"} >
              {item.name}
            </Heading>
            <Text marginTop={3}  fontSize={"sm"}>Jumlah produk: {item.qty.toString()}</Text>
          </Box>
        </Box>
      </Pressable>
    );
  };

  return (
    <>
      <ImageBackground source={require('../assets/bg.jpg')}>
        <Box alignItems="center" rounded="xl"> 
          <Box rounded="xl">  
            <AspectRatio w="100%" ratio={16 / 9}>
              <Box marginTop={20} >
                <Heading color='black' marginLeft={5}>Daftar Produk</Heading>
                <Input onChangeText={searching} variant="rounded" width={320} marginTop='2' marginLeft='5' placeholder="Cari Produk..." backgroundColor='white' ftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />   
              </Box>
            </AspectRatio>
          </Box>
        </Box>
      </ImageBackground>
      { isLoading &&
        <Box style={{width: "100%", flex: 1, justifyContent: "center", marginTop: 50, marginBottom: 50}}>
          <ActivityIndicator size="large" color="#F1AA7B" />
        </Box>
      }
      { !isLoading && displayedProducts.length == 0 &&
        <Box style={{width: "100%", flex: 1, justifyContent: "center", marginTop: 50, marginBottom: 50, alignItems: "center"}}>
          <Text color='black'>Tidak ada produk</Text>
        </Box>
      }
      { !isLoading && displayedProducts.length > 0 &&
        <FlatList
          data={displayedProducts}
          renderItem={renderitem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      }
      <Button size='md' bg='#FFCBA4' onPress={() => navigation.navigate("AddProduct")}>
        <Text color='black'>Tambah Produk </Text>
      </Button>
    </>
  );
};

export default CategoryProduct;