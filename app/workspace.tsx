import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '@/components/Workspace/Header'
import Body from '@/components/Workspace/Body'

export default function home() {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  }
})