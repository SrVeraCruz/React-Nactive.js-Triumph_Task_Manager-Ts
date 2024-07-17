import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import DashBoardItemBox from '@/components/Home/DashBoardItemBox'
import { DashboardItemType } from '@/types'

export default function home() {

  const dashboardList: DashboardItemType[] = [
    {
      id: 1,
      name: 'Espace de travail',
      icon: require('../assets/images/home.png'),
      url: '/workspace',
      color: Colors.BLUE
    },
    {
      id: 3,
      name: 'Suivi des action',
      icon: require('../assets/images/add.png'),
      url: '/add-action',
      color: Colors.SECONDARY_GRAY
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dashboard
      </Text>

      <View>
        <Text style={styles.subTitle}>
          # Vos espaces
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    padding: 20
  }, 
  title: {
    color: Colors.DARK,
    fontFamily: 'poppins-bold',
    fontSize: 34,
    marginTop: 40,
    marginBottom: 10
  }, 
  subTitle: {
    fontFamily: 'poppins-bold',
    color: Colors.SECONDARY_GRAY,
    fontSize: 16
  }
})