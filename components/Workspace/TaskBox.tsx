import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from '../Util/Input/Checkbox'
import { TaskStatusType, TaskType } from '@/types'
import { ListOfActionContext } from '@/context/ListOfActionContext'

interface TaskBoxProps {
  task: TaskType,
}

export default function TaskBox({
  task
}: TaskBoxProps ) {
  const { updateTask, removeTask } = useContext(ListOfActionContext)!
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState(task.status)
  
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen((prev) => !prev)
  }

  const handleStatusChange = (newStatus: TaskStatusType) => {
    if (status !== newStatus) {
      setStatus(newStatus)
      updateTask({ ...task, status: newStatus })
    }
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
              fontSize: 24,
              fontFamily: 'poppins-bold',
              color: Colors.DARK
            }}
          >
            {task?.title}
          </Text>
          <TouchableOpacity onPress={() => removeTask(task.id)}>
            <Ionicons 
              name="trash-outline" 
              size={22} 
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
            label='Non fait'
            checked={status === 'Non fait'}
            onClick={() => handleStatusChange('Non fait')}
          />
          <Checkbox 
            label='En cours'
            checked={status === 'En cours'}
            onClick={() => handleStatusChange('En cours')}
          />
          <Checkbox 
            label='Fait'
            checked={status === 'Fait'}
            onClick={() => handleStatusChange('Fait')}
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