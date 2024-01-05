import React from 'react';
import { Box, Image, Text } from 'native-base';
import { Header } from "../components";

const AboutUsScreen = () => {
  return (
    <>
      <Image
      source={require('../assets/bgScreen.jpg')}
      alt="Alternate Text"
      size="100%"
      resizeMode="cover"
      style={{ position: 'absolute', zIndex: -1 }}
      />
      <Header title={"About Us"} withBack={true} />
      <Box safeArea flex={1} alignItems="center" p="5"  w="100%" mt="15%" maxW="100%" bg="white" borderRadius="30" borderBottomRadius="0" >
        <Image
          source={require('../assets/estock.jpg')}
          alt="estock Logo"
          style={{ width: 257, height: 204, margin: 20, alignItems:"center", justifyContent:"center"}}
        />
        {/* Ganti teks dengan gaya paragraph */}
        <Text textAlign='center' fontSize={16} lineHeight={24}>
          Selamat datang di Aplikasi Gudang! Kami adalah tim yang berkomitmen untuk menyediakan solusi gudang terbaik untuk kebutuhan bisnis Anda. Dengan teknologi terkini, kami memastikan pengelolaan gudang menjadi lebih efisien dan efektif. Terima kasih telah memilih Aplikasi Gudang!
        </Text>
      </Box>
    </>
  );
};

export default AboutUsScreen;
