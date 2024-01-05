import { VStack, Card, Image, FormControl, Text, Input, Button } from "native-base";
import { Header } from "../components/";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import app from "../src/utils/firebase";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";



const AddCategory = () => {
  const navigation = useNavigation();
  const [pic, setPic] = useState(null)
  const [categoryName, setCategoryName] = useState("")
  useEffect(() => {
    return navigation.addListener("focus", () => {
      setPic(null)
      setCategoryName("")
    });
  }, [navigation])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setPic(result.assets[0].uri);
    }
  };
  const submitCategory = async () => {
    if(!pic) return alert("Pilih gambar terlebih dahulu")
    if(categoryName == "") return alert("Isi nama kategori terlebih dahulu")
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
    const addToDatabase = await addDoc(collection(db, "categories"), {
      name: categoryName,
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
      <Header title={"Add Category"} />
      <VStack space={1} alignItems="center">
        {/* Menggunakan Card untuk membungkus gambar dan form */}
        <Card w="320" h="550" bg="white" rounded="md" marginTop={10} shadow={3} p={1}>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={20} marginTop={10}>Tambahkan Kategori</Text>

          <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 20 }}>
            <FormControl.Label>Nama Kategori</FormControl.Label>
            <Input
              placeholder="Masukkan nama kategori" 
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingLeft: 10 }}
              value={categoryName}
              onChangeText={text => setCategoryName(text)}
            />
          </FormControl>

          <FormControl mt={4} style={{ width: '70%', marginLeft: 40 }}>
            <FormControl.Label>Foto Kategori</FormControl.Label>
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

          <Button onPress={submitCategory}
           mt={4} style={{ width: '70%', marginLeft: 40 }}>
            Simpan
          </Button>

          </Card>
        </VStack>
    </>
  );
};

export default AddCategory;
