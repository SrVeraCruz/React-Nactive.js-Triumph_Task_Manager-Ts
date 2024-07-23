import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface VideoModalProps {
  show: boolean,
  onClose: () => void,
  style?: StyleProp<ViewStyle>
  children: React.ReactNode,
}

export default function VideoModal({
  show,
  onClose,
  style,
  children
}: VideoModalProps ) {
  return (
    <View style={[
      styles.container,
      style,
      {
        display: show ? 'flex' : 'none',
        opacity: show ? 1 : 0,
      },
    ]}>
      <TouchableOpacity
        onPress={onClose} 
        style={styles.slideOut} 
      />
      <View style={styles.wrapper}>
        <View style={styles.closeBtnWrapper}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
          >
            <Ionicons
              name="close" 
              size={23} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 97
  },
  wrapper: {
    backgroundColor: Colors.DARK,
    elevation: 20,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 99,
  },
  closeBtnWrapper: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 6,
    zIndex: 99,
  },
  closeBtn: {
  },
  slideOut: {
    position: 'absolute',
    width: "100%",
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 98,
  }
})