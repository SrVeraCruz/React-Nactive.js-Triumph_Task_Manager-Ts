import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { DashboardItemType } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'

interface DashBoardItemBoxProps {
  item: DashboardItemType
}

export default function DashBoardItemBox({
  item
}: DashBoardItemBoxProps ) {
  const router = useRouter()

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push(item.url)}
      style={{
        flex: 1,
        minHeight: 150,
        padding: 20,
        marginTop: 20,
        borderRadius: 6,
        position: 'relative',
        backgroundColor: item.color
      }}
    >
      <Image
        source={item.icon}
        style={{
          height: 30,
          width: 30
        }}
      />
      <Text
        style={{
          color: '#fff',
          fontFamily: 'poppins-medium',
          fontSize: 24
        }}
      >
        {item.name}
      </Text>
      <MaterialIcons
        name="arrow-forward-ios" 
        size={24} 
        color="#fff" 
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20
        }}
      />
    </TouchableOpacity>
  )
}