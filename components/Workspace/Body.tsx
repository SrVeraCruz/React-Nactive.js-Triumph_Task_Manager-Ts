import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import TaskBox from './TaskBox'
import { useRouter } from 'expo-router'
import { TaskType } from '@/types'

export default function Body() {
  const router = useRouter()

  const taskList: TaskType[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.',
      status: 'Not Done'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.',
      status: 'Not Done'
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.',
      status: 'Done'
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.',
      status: 'Done'
    },
  ]

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
        {taskList.length > 0
          ? taskList.map((item, index) => (
              <TaskBox key={index} task={item}/>
            ))
          : <ActivityIndicator size={'large'} color={Colors.PRIMARY}/>
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
  }
})