import React from "react";
import { Heading, Image, Text, Box, ScrollView, Button, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const menu = [
    {
      "to": "AboutUs",
      "color": "#FFC09F",
      "name": "About Us"
    },
    {
      "to": "AddCategory",
      "color": "#FFEE93",
      "name": "Tambah Category"
    },
    {
      "to": "AddProduct",
      "color": "#FCF5C7",
      "name": "Tambah Produk"
    },
  ]

  return (
  //fragmen untuk mengelompokkan jsx
  <> 
    <Image
      source={require('../assets/bgScreen.jpg')}
      alt="Alternate Text"
      size="100%"
      resizeMode="cover"
      style={{ position: 'absolute', zIndex: -1 }}
    />

    <Header title="E-Stock"/>
      <Text fontSize={"25"} margin={6} fontWeight={"bold"} color="#000000" >
        Welcome!
      </Text>
      <Box py={"2"} w="100%" h="100%" backgroundColor={"white"} borderRadius={30} borderBottomRadius={0} paddingBottom={100}>
        <Heading
          fontSize={"22"}
          fontWeight={"bold"}
          margin={6}
          lineHeight={"xs"}
          ellipsizeMode="tail"
          numberOfLines={2}
          color="#000000"
        >
          Highlight
        </Heading>
          
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} marginLeft={5}>
          {/* Box Pertama */}
            <Box w={"257"} h={151} mr={"4"} bg={"#F1AA7B"} borderRadius={8}>
              <HStack>
                <Image w="6" h="6" p="4" alt="Image Data 1" mb={"2"} margin={2} source={require('../assets/Category.png')} />
                <Box>
                  <Heading
                    fontSize={"17"}
                    margin={2}
                    lineHeight={"xs"}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    color="#000000"
                  >
                    Total Jumlah Seluruh 
                  </Heading>
                  <Text fontSize={"17"} marginLeft={2} color="#000000"  fontWeight={"bold"}>
                    Category
                  </Text>
                  <Text fontSize={"25"} color="#000000" marginTop={8} fontWeight={"bold"}>
                    50
                  </Text>
                  <Text fontSize={"15"} color="#000000" >
                    Category
                  </Text>
                </Box>
              </HStack>
            </Box>

          {/* Box Kedua */}
            <Box w={"257"} h={151} mr={"4"} bg={"#FCE1E4"} borderRadius={8}>
              <HStack>
                <Image w="6" h="6" p="4" alt="Image Data 1" mb={"2"} margin={2} source={require('../assets/Product.png')} />
                <Box>
                  <Heading
                    fontSize={"17"}
                    margin={2}
                    lineHeight={"xs"}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    color="#000000"
                  >
                    Total Jumlah Seluruh 
                  </Heading>
                  <Text fontSize={"17"} marginLeft={2} color="#000000"  fontWeight={"bold"}>
                    Product
                  </Text>
                  <Text fontSize={"25"} color="#000000" marginTop={8} fontWeight={"bold"}>
                    50
                  </Text>
                  <Text fontSize={"15"} color="#000000">
                    Product
                  </Text>
                </Box>
              </HStack>
            </Box>
        </ScrollView>

        {/* Bagian Button */}
        <ScrollView marginBottom="20">
          <Heading
            fontSize={"22"}
            fontWeight={"bold"}
            margin={3}
            marginLeft={6}
            lineHeight={"xs"}
            ellipsizeMode="tail"
            numberOfLines={2}
            color="#000000"
          >
            Menu
          </Heading>
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {menu.map((e, index) => (
              <Button
                w={"80%"}
                margin={3}
                bg={e.color}
                _text={{ color: "#000000" }}
                onPress={() => {
                  navigation.navigate(e.to);
                }}
                key={"menu"+index}
              >
                {e.name}
              </Button>
            ))}
          </Box>
        </ScrollView>
      </Box>
    </>  
  );
};


export default HomeScreen;