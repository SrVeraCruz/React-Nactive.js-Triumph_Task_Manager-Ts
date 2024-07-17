import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from '../Util/Input/Checkbox'
import { TaskType } from '@/types'

interface TaskBoxProps {
  task: TaskType
}

export default function TaskBox({
  task
}: TaskBoxProps ) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNotDone, setIsNotDone] = useState(task?.status === 'Not Done' ? true : false)
  const [isPending, setIsPending] = useState(task?.status === 'Pending' ? true : false)
  const [isDone, setIsDone] = useState(task?.status === 'Done' ? true : false)
  
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen((prev) => !prev)
  }

  const handleIsNotDone = () => {
    setIsNotDone(!isNotDone)
    setIsPending(false)
    setIsDone(false)
  }

  const handleIsPending = () => {
    setIsPending(!isPending)
    setIsNotDone(false)
    setIsDone(false)
  }

  const handleIsDone = () => {
    setIsDone(!isDone)
    setIsNotDone(false)
    setIsPending(false)
  }

  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={handlePress}
      activeOpacity={1}
    >
      <View
        style={{
          gap: 10,
          marginBottom: 5
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: 'poppins-bold',
              color: Colors.DARK
            }}
          >
            {task?.title}
          </Text>
          <TouchableOpacity>
            <Ionicons 
              name="trash-outline" 
              size={24} 
              color={Colors.RED} 
            />
          </TouchableOpacity>
        </View>

        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Checkbox 
            label='Not Done'
            checked={isNotDone}
            onClick={handleIsNotDone}
          />
          <Checkbox 
            label='Pending'
            checked={isPending}
            onClick={handleIsPending}
          />
          <Checkbox 
            label='Done'
            checked={isDone}
            onClick={handleIsDone}
          />
        </View>
      </View>

      {isOpen && (
        <View
          style={{
            gap: 15,
            marginTop: 15
          }}
        >
          <View
            style={ styles.subContainer }
          >
            <Text
              style={{
                color: Colors.PRIMARY_GRAY,
                fontFamily: 'poppins-medium',
                fontSize: 15

              }}
            >
              {task?.description}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 39,
              borderColor: Colors.SECONDARY_GRAY,
              borderWidth: 1.5,
              borderRadius: 99,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons 
              name="play" 
              size={20}
              color={Colors.SECONDARY_GRAY} 
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.BG_GRAY,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1,
    borderRadius: 6
  },
  subContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.BG_GRAY,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1,
    borderRadius: 6,
  }
})