import { View } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Body from '@/components/Home/Body'

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