import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import DashBoardItemBox from '@/components/Home/DashBoardItemBox'

export default function home() {

  const dashboardList = [
    {
      id: 1,
      name: 'Workspace',
      icon: require('../assets/images/home.png'),
      url: '/workspace',
      color: Colors.BLUE
    },
    {
      id: 2,
      name: 'Board',
      icon: require('../assets/images/star.png'),
      url: '/home',
      color: Colors.GREEN
    },
    {
      id: 3,
      name: 'Add task',
      icon: require('../assets/images/add.png'),
      url: '/new-task',
      color: Colors.SECONDARY_GRAY
    },
  ]

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        padding: 20
      }}
    >
      <Text
        style={{
          color: Colors.DARK,
          fontFamily: 'poppins-bold',
          fontSize: 34,
          marginTop: 40,
          marginBottom: 10
        }}
      >
        Dashboard
      </Text>

      <View>
        <Text
          style={{
            fontFamily: 'poppins-bold',
            color: Colors.SECONDARY_GRAY,
            fontSize: 16
          }}
        >
          # Your spaces
        </Text>

        <FlatList 
          data={dashboardList}
          renderItem={({item, index}) => (
            <DashBoardItemBox 
              key={index}
              item={item}
            />
          )}
        />
      </View>
    </View>
  )
}