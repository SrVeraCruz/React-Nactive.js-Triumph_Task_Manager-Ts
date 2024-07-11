import { View } from 'react-native'
import React from 'react'
import Header from '@/components/Workspace/Header'
import Body from '@/components/Workspace/Body'

export default function home() {
  return (
    <View 
      style={{
        backgroundColor: '#fff',
        height: '100%'
      }}
    >
      <Header />
      <Body />
    </View>
  )
}