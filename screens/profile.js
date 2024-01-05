import { Image, Text, FormControl, Input, VStack, Card } from "native-base";
import { Header } from '../components';

const Profile = () => {
  return (
    <>
    <Image
      source={require('../assets/homee.png')}
      alt="Alternate Text"
      size="100%"
      resizeMode="cover"
      style={{ position: 'absolute', zIndex: -1 }}
    />
      <Header title={"Profile"} />
      <Text fontSize={25} textAlign={"center"} color={"white"} 
            fontWeight={"bold"}>Welcome To Profile!</Text>
      <VStack space={1} alignItems="center">
        {/* Menggunakan Card untuk membungkus gambar dan form */}
        <Card w="320" h="550" bg="white" rounded="md" marginTop={10} shadow={3} p={5}>
          <Image
              source={require('../assets/profil.png')}
              alt="Profile Image"
              rounded="full"
              marginBottom={5}
              width={250}
              height={250} 
              marginTop={9}
              marginLeft={4}
          />

          <FormControl style={{ width: '70%', marginLeft: 40 }}>
            <FormControl.Label>Your Email</FormControl.Label>
            <Input
              placeholder="gudang.estock@gmail.com" isReadOnly 
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingLeft: 10 }}/>
          </FormControl>

          <FormControl mt={4} style={{ width: '70%', marginLeft: 40 }}>
            <FormControl.Label>Your Password</FormControl.Label>
            <Input
              placeholder="estock123" isReadOnly
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingLeft: 10 }}/>
          </FormControl>
          </Card>
        </VStack>
  </>
  );
};

export default Profile;
