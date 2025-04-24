// App.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [uri, setUri] = useState(null);

  // 1️⃣ Ask for camera & gallery permissions as soon as the app loads
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const camera  = await ImagePicker.requestCameraPermissionsAsync();
        if (gallery.status !== 'granted' || camera.status !== 'granted') {
          alert('We need camera and photo permissions to make this work!');
        }
      }
    })();
  }, []);

  // 2️⃣ Launch the system camera
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) setUri(result.uri);
  };

  // 3️⃣ Launch the system photo gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) setUri(result.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Joshua Leslie Arihadi</Text>
      <Text style={styles.id}>0000044898</Text>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>OPEN CAMERA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>OPEN GALLERY</Text>
      </TouchableOpacity>

      {uri && <Image source={{ uri }} style={styles.image} />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 20, backgroundColor: '#fff',
  },
  name:      { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  id:        { fontSize: 14, color: '#666', marginBottom: 16 },
  button:    {
    backgroundColor: '#2680EB',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginVertical: 6,
  },
  buttonText:{ color: '#fff', fontWeight: '500' },
  image:     {
    width: 300, height: 300,
    marginTop: 20, borderRadius: 6,
  },
});
