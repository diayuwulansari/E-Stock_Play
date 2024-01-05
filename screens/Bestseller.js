import React, {useEffect, useState} from 'react';
import { Text, Box, Image, ScrollView } from 'native-base';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "@firebase/firestore";
import app from '../src/utils/firebase';
import { ActivityIndicator } from 'react-native';

const  BestSeller = () => {
  const [bestselling, setBestselling] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const db = getFirestore(app)
    const getBestselling = async () => {
      let Transactions = {}
      const outboundTransactions = await getDocs(query(collection(db, "transactions"), where("type", "==", "Keluar")))
      outboundTransactions.forEach(snpsht => {
        const docData = snpsht.data()
        if(docData.productId in Transactions){
          Transactions[docData.productId] += docData.qty
        }else{
          Transactions[docData.productId] = docData.qty
        }
      })
      let tempBestselling = []
      for (let id in Transactions){
        let data = await getDoc(doc(db, `products/${id}`))
        data = data.data()
        console.log(data)
        tempBestselling.push({img: data.img, name: data.name, total: Transactions[id]})
      }
      tempBestselling.sort((a,b) => b["total"]-a["total"])
      setBestselling(tempBestselling.length > 10 ? tempBestselling.slice(0,10) : tempBestselling)
      setIsLoading(false)
    }
    getBestselling()
  },[])
return (
<>
  <Image
    source={require('../assets/bgpab953.jpeg')}
    alt="Alternate Text"
    size="100%"
    resizeMode="cover"
    style={{ position: 'absolute', zIndex: -1 }}
  />

  <ScrollView>
    { isLoading &&
      <Box style={{
        width: "100%", 
        flex: 1, 
        justifyContent: "center", 
        marginTop: 50, 
        marginBottom: 50, 
        backgroundColor: "#fff", 
        marginRight: 10, 
        marginLeft: 10,
        padding: 20
      }}>
        <ActivityIndicator size="large" color="#F1AA7B" />
      </Box>
    }
    { !isLoading &&
      bestselling.map(item => (
        <Box
          borderWidth={1}
          borderRadius={8}
          overflow="hidden"
          width="300px"
          height="200px"
          marginLeft={60}
          marginTop={60}
          key={"bestselling"+item.id}
        >
          <Image
            source={{uri:item.img}}
            alt={item.name}
            resizeMode="cover"
            height="100%"
            width="100%"
          />
          <Box p={4} bg="rgba(0, 0, 0, 0.5)" position="absolute" bottom={0} left={0} right={0}>
            <Text color="white" fontSize="lg" fontWeight="bold">
            {item.name}
            </Text>
          </Box>
        </Box>
      ))
    }
  </ScrollView>
</> 
);}


export default BestSeller;
