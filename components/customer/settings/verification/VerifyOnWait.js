import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

const ImageViewer = ({ source, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableHighlight onPress={() => setModalVisible(true)}>
        <Image
          resizeMode="contain"
          source={{ uri: source }}
          style={{ height: 120, width: 120 }}
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
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </Modal>
    </>
  );
};

const VerifyOnWait = ({ images }) => {
  return (
    <View
      className="flex-1"
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <View className="px-5">
        <Text className="text-xl font-medium text-center">
          Verification is on process
        </Text>
        <Text className="font-medium text-center">
          Your submitted credentials are being reviewed for verification
          purposes. Please wait for the process to complete.
        </Text>
      </View>
    </View>
  );
};

export default VerifyOnWait;
