import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface CheckboxProps {
  label: string,
  checked?: boolean,
  disabled?: boolean,
  onClick?: () => void
}

export default function Checkbox({
  label,
  checked,
  disabled,
  onClick,
}: CheckboxProps ) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 19,
          height: 19,
          borderWidth: 1.5,
          borderRadius: 3,
          borderColor: checked ? Colors.PRIMARY : Colors.SECONDARY_GRAY,
        }}
      >  
        {checked && (
          <MaterialCommunityIcons 
            name="check-bold" 
            size={15} 
            color={Colors.PRIMARY}
          />
        )}
      </View>
      <Text
        style={{
          marginTop: 2,
          fontSize: 13,
          fontFamily: checked ? 'poppins-bold' : 'poppins',
          color: checked ? Colors.PRIMARY : Colors.SECONDARY_GRAY
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}