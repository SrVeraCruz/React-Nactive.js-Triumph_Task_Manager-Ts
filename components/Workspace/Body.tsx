import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors'
import TaskBox from './TaskBox'
import { useRouter } from 'expo-router'
import { ListOfActionContext } from '@/context/ListOfActionContext'

export default function Body() {
  const router = useRouter()
  const {isLoading, taskList}  = useContext(ListOfActionContext)!

  const handleAddTask = () => {
    router.push('/add-action')
  }

  return (
    <ScrollView style={{padding: 20}}>
      <View style={styles.container}>
        <Text style={styles.title}>
          # Toutes les tâches
        </Text>
        <TouchableOpacity
          onPress={handleAddTask}
        >
          <Text style={styles.addBtn}>
            +Ajouter
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{gap: 18}}>
        {isLoading ? (
          <ActivityIndicator 
            size={'large'}
            color={Colors.PRIMARY}
            style={{marginTop: 30}}
          />
        ):(taskList.length > 0
          ? taskList.map((item, index) => (
              <TaskBox key={index} task={item}/>
            ))
          : (
            <Text style={styles.noDataLabel}>
              Aucune tache
            </Text>
          )
        )
      }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: Colors.DARK
  },
  addBtn: {
    color: Colors.PRIMARY,
    fontFamily: 'poppins-bold'
  },
  noDataLabel: {
    fontFamily: 'poppins-bold',
    fontSize: 15,
    color: Colors.PRIMARY_GRAY,
    textAlign: 'center',
    marginTop: '50%'
  },
})