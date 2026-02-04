// src/screens/CollectionsOverviewScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  Switch,
} from 'react-native';

export default function CollectionsOverviewScreen({ navigation, route }) {
  // Mock data - in a real app, this would come from state management or API
  const [collections, setCollections] = useState([
    {
      id: '1',
      name: 'Fitness',
      images: [
        'https://picsum.photos/200/300?random=1',
        'https://picsum.photos/200/300?random=2',
        'https://picsum.photos/200/300?random=3',
      ],
      frequency: 'Weekly',
      location: 'Home Screen',
      rotation: 'Random',
      enabled: true,
    },
    {
      id: '2',
      name: 'Random',
      images: [
        'https://picsum.photos/200/300?random=4',
        'https://picsum.photos/200/300?random=5',
        'https://picsum.photos/200/300?random=6',
        'https://picsum.photos/200/300?random=7',
      ],
      frequency: 'Daily',
      location: 'Lockscreen',
      rotation: 'Shuffle',
      enabled: false,
    },
  ]);

  const toggleCollection = (id) => {
    setCollections(collections.map(col => 
      col.id === id ? { ...col, enabled: !col.enabled } : col
    ));
  };

  const handleAddNew = () => {
    navigation.navigate('Home');
  };

  const renderCollection = (collection) => (
    <View key={collection.id} style={styles.collectionCard}>
      {/* Image Grid */}
      <View style={styles.imageGrid}>
        {collection.images.slice(0, 4).map((image, index) => (
          <View
            key={index}
            style={[
              styles.imageCell,
              index === 0 && styles.imageCellFirst,
              index === collection.images.length - 1 && styles.imageCellLast,
            ]}
          >
            <Image
              source={{ uri: image }}
              style={styles.cellImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>

      {/* Collection Info */}
      <View style={styles.collectionInfo}>
        <View style={styles.collectionHeader}>
          <Text style={styles.collectionName}>{collection.name}</Text>
          <Switch
            value={collection.enabled}
            onValueChange={() => toggleCollection(collection.id)}
            trackColor={{ false: '#767577', true: '#4CD964' }}
            thumbColor="#ffffff"
            ios_backgroundColor="#767577"
          />
        </View>

        <View style={styles.collectionMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>📅 {collection.frequency}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>📱 {collection.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>🔀 {collection.rotation}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.emoji}>🌸</Text>
              <Text style={styles.title}>Hey there!</Text>
              <Text style={styles.subtitle}>All collections</Text>
            </View>

            {/* Collections List */}
            <View style={styles.collectionsContainer}>
              {collections.map(collection => renderCollection(collection))}
            </View>

            {/* Add spacing for FAB */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Floating Add Button */}
          <TouchableOpacity
            style={styles.fab}
            onPress={handleAddNew}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Recoleta',
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'NeueMontreal',
  },
  collectionsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  collectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    height: 160,
    gap: 4,
  },
  imageCell: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageCellFirst: {
    borderTopLeftRadius: 20,
  },
  imageCellLast: {
    borderTopRightRadius: 20,
  },
  cellImage: {
    width: '100%',
    height: '100%',
  },
  collectionInfo: {
    padding: 16,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  collectionName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'NeueMontreal',
  },
  collectionMeta: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: 'NeueMontreal',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '300',
    marginTop: -2,
  },
});