// src/screens/CollectionScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3; // 3 columns with padding

export default function CollectionScreen({ route, navigation }) {
  const { images = [], sourceUrl = '' } = route.params || {};

  const renderImage = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.logo}>✨</Text>
          <Text style={styles.title}>Your collection is ready!</Text>
          <Text style={styles.subtitle}>
            {images.length} wallpaper{images.length !== 1 ? 's' : ''} ready
          </Text>
        </View>

        {/* Image Grid */}
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Action */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => alert('Customize screen coming soon!')}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backIcon: {
    fontSize: 20,
    color: '#ffffff',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: '#ffffff',
  },
  logo: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  grid: {
    padding: 20,
    paddingTop: 0,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize * 1.3,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    padding: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});