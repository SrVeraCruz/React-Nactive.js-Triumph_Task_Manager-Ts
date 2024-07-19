import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
  variant: variant,
  onPress?: () => void,
  disabled?: boolean,
  children: React.ReactNode
}

type variant = 'outline' | 'back' 

export default function Button({
  variant,
  onPress,
  disabled,
  children
}: ButtonProps ) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
      style={[
        variant === 'back' && styles.black,
        variant === 'outline' && styles.outline,
        {
          opacity: disabled ? 0.5 : 1
        }
      ]}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  black: {
    width: '100%',
    backgroundColor: '#000',
    padding: 13,
    borderRadius: 99,
    alignItems: 'center',
  },
  outline: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 13,
    borderRadius: 99,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'poppins-bold',
    fontSize: 16,
    letterSpacing: 1.5
  }
})