import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  let openImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true){
      return;
    }
    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const openShareDialog = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert("Sharing is not available on your platform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <Text style={styles.title}>No disponible para esta plataforma</Text>
      ) : (
        <>
          <Text style={styles.title}>Selecciona una imagen de tu dispositivo</Text>
          <TouchableOpacity onPress={openImage}>
            <Image
              style={styles.image}
              source={{
                uri:
                  selectedImage !== null
                    ? selectedImage.localUri
                    : "https://picsum.photos/200/200",
              }}
            />
          </TouchableOpacity>
        </>
      )}
      { selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartir imagen</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcffff"
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 200,
    margin: 30,
  },
  button: {
    backgroundColor: "#5086c1",
    padding: 10,
    borderRadius: 10,
  }
});


