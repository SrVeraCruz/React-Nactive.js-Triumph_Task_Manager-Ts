import { View, Text, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import TaskBox from './TaskBox'

export default function Body() {

  const taskList = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.'
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.'
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Lorem lorem lorem lorem lorem lorem lorem.'
    },
  ]

  return (
    <ScrollView
      style={{
        padding: 20
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10
        }}
      >
        <Text
          style={{
            fontFamily: 'poppins-bold',
            fontSize: 18,
            color: Colors.DARK
          }}
        >
          #All Tasks
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: 'poppins-bold'
            }}
          >
            +Add
          </Text>
        </TouchableOpacity>
      </View>

      <View 
        style={{
          gap: 18
        }}
      >
        {taskList.length 
          ? taskList.map((item, index) => (
              <TaskBox 
                key={index}
                task={item}
              />
            ))
          : <ActivityIndicator 
              size={'large'}
              color={Colors.PRIMARY}
            />
      }
      </View>
    </ScrollView>
  )
}