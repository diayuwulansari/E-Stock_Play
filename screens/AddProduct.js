import { VStack, Card, Image, FormControl, Text, Input, Button, ScrollView, Select, CheckIcon  } from "native-base";
import { Header } from "../components/";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import app from "../src/utils/firebase";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [pic, setPic] = useState(null)
  const [namaProduk, setNamaProduk] = useState("")
  const [jumlahProduk, setJumlahProduk] = useState(0)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setPic(result.assets[0].uri)
    }
  };
  useEffect(() => {
    const db = getFirestore(app)
    const categoriesCol = collection(db, "categories")
    getDocs(categoriesCol)
      .then(snapshot => {setCategories(snapshot.docs.map(doc => doc.data()));setIsLoading(false)})
    return navigation.addListener("focus", () => {
        setIsLoading(false)
        setSelectedCategory("")
        setPic(null)
        setNamaProduk("")
        setJumlahProduk(0)
    });
  },[navigation])

  const submitProduct = async () => {
    if(!pic) return alert("Pilih gambar terlebih dahulu")
    if(namaProduk == "") return alert("Isi nama produk terlebih dahulu")
    if(!jumlahProduk) return alert("Isi jumlah produk terlebih dahulu")
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", pic, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(app), uuidv4());
    const result = await uploadBytes(fileRef, blob);

    blob.close();

    const downloadURL = await getDownloadURL(fileRef);

    const db = getFirestore(app)
    const addToDatabase = await addDoc(collection(db, "products"), {
      name: namaProduk,
      qty: jumlahProduk,
      category: selectedCategory,
      img: downloadURL
    });
    if(addToDatabase) navigation.navigate("Category")
  }
  return (
    <>
      <Image
      source={require('../assets/bdAdd.jpg')}
      alt="Alternate Text"
      size="100%"
      resizeMode="cover"
      style={{ position: 'absolute', zIndex: -1 }}
    />

      <Header title={"Add Product"} />
      <VStack space={1} alignItems="center">
        <Card w="320" h="700" bg="white" rounded="md" marginTop={10} shadow={3} p={5}>
          <ScrollView>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={20} marginTop={10}>Tambahkan Product</Text>
            <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 20 }}>
              <FormControl.Label>Kategori Produk</FormControl.Label>
              <Select 
                selectedValue={selectedCategory} 
                minWidth="200" 
                accessibilityLabel="Pilih Kategori" 
                placeholder="Pilih Kategori" 
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} 
                mt={1} 
                onValueChange={itemValue => setSelectedCategory(itemValue)}
              >
                {categories.map((e, index) => <Select.Item key={"categorySelection" + index} label={e.name} value={e.name} />)}
              </Select>
            </FormControl>

            <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 10 }}>
              <FormControl.Label>Nama Produk</FormControl.Label>
              <Input
                placeholder="Masukkan nama produk" 
                style={{ paddingLeft: 10 }}
                value={namaProduk}
                onChangeText={(text) => setNamaProduk(text)}
              />
            </FormControl>

            <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 10 }}>
              <FormControl.Label>Jumlah Produk</FormControl.Label>
              <Input
                placeholder="Masukkan jumlah produk" 
                style={{paddingLeft: 10 }}
                keyboardType="numeric"
                value={jumlahProduk}
                onChangeText={(text) => setJumlahProduk(parseInt(text))}
              />
            </FormControl>

            <FormControl mt={4} style={{ width: '70%', marginLeft: 40 }}>
              <FormControl.Label>Foto Produk</FormControl.Label>
              { pic && <Image source={{uri: pic}} style={{width: "50%", marginTop: 10, marginBottom: 10, aspectRatio: 1/1, marginLeft: "auto", marginRight: "auto"}} alt="Preview Image" /> }
              <Button
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "#fff"
                }}
                onPress={pickImage}
              >
                <Text>Pilih Foto</Text>
              </Button>
            </FormControl>

            <Button 
              onPress={submitProduct}
              mt={4} 
              style={{ 
                width: '70%', 
                marginLeft: 40 
              }}
              isDisabled={isLoading}
            >
              Simpan
            </Button>
          </ScrollView>
        </Card>
      </VStack>
    </>
  );
};

export default AddProduct;
