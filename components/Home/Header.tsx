import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
  return (
    <View
      style={{
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: 'poppins',
          fontSize: 13
        }}
      >
        Welcome
      </Text>
      <Text
        style={{
          color: "#fff",
          fontFamily: 'poppins-bold',
          fontSize: 20,
          marginTop: -8
        }}
      >
        Your Workspace
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 5,
          marginTop: 10,
          borderRadius: 8
        }}
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={Colors.PRIMARY} 
        />

        <TextInput 
          placeholder='Search...'
          style={{
            fontFamily: 'poppins',
            fontSize: 16,
            flex: 1,
            color: Colors.PRIMARY_GRAY
          }}
        />
      </View>
    </View>
  )
}