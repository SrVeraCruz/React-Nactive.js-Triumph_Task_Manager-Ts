import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { ResizeMode, Video } from 'expo-av'
import Modal from '../Util/Modal'

interface VideoModalProps {
  uri: string,
  show: boolean,
  style?: StyleProp<ViewStyle>
  onClose: () => void
}

export default function VideoModal({
  uri,
  show,
  style,
  onClose
}: VideoModalProps ) {
  
  return (
    <Modal
      show={show}
      onClose={onClose}
      style={style}
    >
      <View style={styles.container}>
        <Video 
          source={{ uri: uri }} 
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
        />
      </View>
    </Modal>
 
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999
  },
  video: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
})