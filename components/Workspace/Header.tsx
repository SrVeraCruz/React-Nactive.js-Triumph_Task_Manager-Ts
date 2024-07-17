import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Header() {
  const router = useRouter()

  return (
    <View style={styles.container}>
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
            Bienvenu 
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: 'poppins-bold',
              fontSize: 20,
              marginTop: -8
            }}
          >
            Your Espace de travail
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.push('/home')}
        >
          <Entypo 
            name="home" 
            size={24} 
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
          placeholder='chercher...'
          style={{
            fontFamily: 'poppins',
            fontSize: 16,
            flex: 1,
            color: Colors.PRIMARY_GRAY
          }}
        />
      </View>
      <View style={styles.iconWrapper}>
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="list-sharp" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <FontAwesome name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10
  }
})