import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ImageViewer = ({ source, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: source }}
          style={{ width: 120, height: 120 }}
          className="mr-1 rounded-md"
        />
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: source }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </Modal>
    </>
  );
};

const DocumentViewer = ({ images, selectedId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePreview = (index) => {
    setSelectedImage(index);
    setModalVisible(true);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) =>
          index === 0 || index === 1 ? (
            <TouchableOpacity key={index} onPress={() => handlePreview(index)}>
              <>
                <Image
                  className="mr-1 rounded-md"
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  resizeMode="cover"
                />
                <Text className="text-center">
                  {selectedId.selectedId1} - {index === 0 ? 'front' : 'back'}
                </Text>
              </>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={index} onPress={() => handlePreview(index)}>
              <>
                <Image
                  className="mr-1 rounded-md"
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  resizeMode="cover"
                />
                <Text className="text-center">
                  {selectedId.selectedId2} - {index === 0 ? 'front' : 'back'}
                </Text>
              </>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className="items-center justify-center flex-1">
          <Image
            resizeMode="contain"
            source={{ uri: images[selectedImage] }}
            style={{ width: '100%', height: '50%' }}
          />
          <View className="flex-row justify-around w-full my-2">
            <TouchableOpacity
              onPress={() => setSelectedImage(selectedImage - 1)}
              disabled={selectedImage === 0}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginRight: 16,
                  color: selectedImage === 0 ? '#eee' : 'black',
                }}
              >
                Prev
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage(selectedImage + 1)}
              disabled={selectedImage === images.length - 1}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 16,
                  color: selectedImage === images.length - 1 ? '#eee' : 'black',
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DocumentViewer;
