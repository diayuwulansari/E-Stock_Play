import { VStack, Card, Image, FormControl, Text, Input, Button, ScrollView, Select, CheckIcon  } from "native-base";
import { Header } from "../components";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import app from "../src/utils/firebase";


const Transaction = ({route}) => {
  const navigation = useNavigation();
  const {name, id, jumlah} = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [jumlahProduk, setJumlahProduk] = useState(0)
  const [jenisTransaksi, setJenisTransaksi] = useState("")
  useEffect(() => {
    const db = getFirestore(app)
    return navigation.addListener("focus", () => {
      setIsLoading(false)
      setJumlahProduk(0)
      setJenisTransaksi("")
    });
  },[navigation])

  const submitTransaction = async () => {
    if (jenisTransaksi == "") return alert("Pilih jenis transaksi terlebih dahulu !!")
    if (jumlah < jumlahProduk) return alert("Jumlah tidak boleh lebih besar dari stock !!")
    setIsLoading(true)
    const db = getFirestore(app)
    const setChangeProduct = await updateDoc(doc(db, `products/${id}`), {qty: jenisTransaksi == "Masuk" ? jumlah + jumlahProduk : jumlah - jumlahProduk})
    const addToDatabase = await addDoc(collection(db, "transactions"), {
      productId: id,
      qty: jumlahProduk,
      type: jenisTransaksi
    });
    if (addToDatabase) {navigation.navigate("Home");setIsLoading(false)}
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

      <Header title={"Transaction"} />
      <VStack space={1} alignItems="center">
        <Card w="320" h="700" bg="white" rounded="md" marginTop={10} shadow={3} p={5}>
          <ScrollView>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={20} marginTop={10}>Transaction</Text>
            <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 10 }}>
              <FormControl.Label>Nama Produk</FormControl.Label>
              <Input
                style={{ paddingLeft: 10 }}
                value={name}
                isReadOnly
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

            <FormControl style={{ width: '70%', marginLeft: 40, marginTop: 20 }}>
              <FormControl.Label>Jenis Transaksi</FormControl.Label>
              <Select 
                minWidth="200" 
                accessibilityLabel="Pilih Kategori" 
                placeholder="Pilih Kategori" 
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} 
                mt={1} 
                onValueChange={(text) => setJenisTransaksi(text)}
                selectedValue={jenisTransaksi}
              >
                <Select.Item label="Masuk" value="Masuk" />
                <Select.Item label="Keluar" value="Keluar" />
              </Select>
            </FormControl>

            <Button 
              mt={4} 
              style={{ 
                width: '70%', 
                marginLeft: 40 
              }}
              onPress={submitTransaction}
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

export default Transaction;
