import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Header() {
  const router = useRouter()

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
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
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.push('/home')}
        >
          <Entypo 
            name="home" 
            size={28} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 5,
          marginTop: 10,
          borderRadius: 6
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