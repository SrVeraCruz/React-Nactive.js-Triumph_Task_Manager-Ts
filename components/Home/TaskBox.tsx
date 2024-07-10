import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface TaskBoxProps {
  task: TaskType
}

export default function TaskBox({
  task
}: TaskBoxProps ) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen((prev) => !prev)
  }

  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={handlePress}
      activeOpacity={1}
    >
      <View
        style={{
          gap: 2
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

        <View>
          <Text
            style={{
              color: Colors.PRIMARY_GRAY,
              fontSize: 16
            }}
          >
            Status
          </Text>
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
    borderRadius: 8
  },
  subContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.BG_GRAY,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1,
    borderRadius: 5,
  }
})