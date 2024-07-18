import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import TaskBox from './TaskBox'
import { useRouter } from 'expo-router'
import { SuiviDesActionType, TaskType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Body() {
  const router = useRouter()
  const [listSuiviDesActions, setListSuiviDesActions] = useState<SuiviDesActionType[]>([])
  const [taskList, setTaskList] = useState<TaskType[]>([])

  const handleAddTask = () => {
    router.push('/add-action')
  }

  const getSuiviDesActions = useCallback(async () => {
    setListSuiviDesActions([])
    setTaskList([])

    const res = await AsyncStorage.getItem('suiviDesActions')
    if(res) {
      const parsedRes: SuiviDesActionType[] = JSON.parse(res)
      setListSuiviDesActions(parsedRes)

      parsedRes.map((sAction) => {
        sAction.tasks.map((task) => {
          setTaskList((prev) => (
            [...prev, task]
          ))
        })
      })
    }
  }, [AsyncStorage])

  useEffect(() => {
    getSuiviDesActions()
  }, [getSuiviDesActions])

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
          : (
            <Text style={styles.noDataLabel}>
              Aucune tache
            </Text>
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