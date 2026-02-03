import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

  export default function HomeScreen({ navigation }) {
  console.log('HomeScreen rendered');
  // const [pinterestUrl, setPinterestUrl] = useState('');
  // ... rest of code
  
  const [pinterestUrl, setPinterestUrl] = useState('');

const handlePinterestSubmit = () => {
  if (pinterestUrl.trim()) {
    // For now, we'll navigate with the URL
    // Later you'll fetch images from Pinterest API
    navigation.navigate('Collection', { 
      sourceUrl: pinterestUrl,
      images: [] // Empty for now, will be filled when you add Pinterest scraping
    });
  }
};

  const handleFileUpload = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access photos is required!');
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      // Extract URIs from selected images
      const imageUris = result.assets.map(asset => asset.uri);
      
      // Navigate to Collection screen with selected images
      navigation.navigate('Collection', { 
        images: imageUris,
        sourceUrl: 'uploaded'
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
  
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Optional: Add gradient overlay on top of image */}
        {/* <LinearGradient
          colors={['rgba(63, 14, 154, 0.6)', 'rgba(159, 190, 216, 0.6)', 'rgba(244, 228, 193, 0.6)', 'rgba(232, 196, 160, 0.6)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        > */}
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.emoji}>🌸</Text>
                <Text style={styles.title}>
                  Let's turn your inspiration{'\n'}into wallpapers
                </Text>
              </View>

                {/* Sample Cards Preview */}
                <View style={styles.previewContainer}>
                  <ImageBackground
                    source={require('../../assets/images/images.png')}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </View>

              <View style={styles.spacer} />

              {/* Bottom Section - Input Areas */}
              <View style={styles.bottomSection}>
                {/* Pinterest Board Section */}
                <View style={styles.inputSection}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Use a Pinterest board</Text>
                    <Text style={styles.sectionSubtitle}>
                      Turn your Pinterest vision board into your daily motivation
                    </Text>
                  </View>
                  
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your board link here"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    value={pinterestUrl}
                    onChangeText={setPinterestUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    returnKeyType="go"
                    onSubmitEditing={handlePinterestSubmit}
                  />
                </View>

                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={handleFileUpload}
                  activeOpacity={0.8}
                >
                  <View style={styles.uploadContent}>
                    <Text style={styles.sectionTitle}>Upload images</Text>
                    <Text style={styles.sectionSubtitle}>
                      Choose photos, art, or screenshots you want to use as wallpapers
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 38,
    letterSpacing: -0.5,
    fontFamily: 'Recoleta',
  },
  previewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: width * 0.5, // Adjust this height as needed
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    gap: 20,
    marginBottom: 20,
  },
  inputSection: {
    gap: 12,
  },
  uploadSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  uploadContent: {
    gap: 8,
  },
  sectionHeader: {
    gap: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'NeueMontreal', // ✅ FONT APPLIED
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
    fontFamily: 'NeueMontreal', // ✅ FONT APPLIED
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'NeueMontreal', // ✅ FONT APPLIED
  },
});