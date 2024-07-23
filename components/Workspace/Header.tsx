import { View, Text, TextInput, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { ListOfActionContext } from '@/context/ListOfActionContext'
import FilterModal from './FilterModal'
import { customAnimation } from '@/constants/Variables'
import OptionsModal from './OptionsModal'

export default function Header() {
  const router = useRouter()  
  const [query, setQuery] = useState("")
  const [isFilterModalShow, setIsFilterModalShow] = useState(false)
  const [isOptionsModalShow, setIsOptionsModalShow] = useState(false)
  const { 
    isSearching, 
    selectedFilter, 
    debouncedFetchResults, 
    setIsSearching 
  } = useContext(ListOfActionContext)!

  const searchText = useMemo(() => {
    return selectedFilter !== 'Tous' 
    ? 'chercher par '+selectedFilter+'...' 
    : 'chercher tache...'
  }, [selectedFilter])

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedFetchResults(value)
  }

  const handleFilterPress = () => {
    LayoutAnimation.configureNext(customAnimation)
    setIsFilterModalShow(!isFilterModalShow)
  }

  const handleOptionsPress = () => {
    LayoutAnimation.configureNext(customAnimation)
    setIsOptionsModalShow(!isOptionsModalShow)
  }

  useEffect(() => {
    if(!query) {
      setIsSearching(false)
      return
    }

    if(!isSearching) setIsSearching(true) 
  }, [query])
  
  useEffect(() => {
    setQuery('')
  }, [selectedFilter])

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
          <Text
            style={{
              color: "#fff",
              fontFamily: 'poppins',
              fontSize: 13
            }}
          >
            Bienvenu 
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: 'poppins-bold',
              fontSize: 20,
              marginTop: -8
            }}
          >
            Your Espace de travail
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 5,
          marginTop: 10,
          borderRadius: 6
        }}
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={Colors.PRIMARY} 
        />

        <TextInput 
          placeholder={searchText.toLowerCase()}
          value={query}
          onChangeText={(value) => handleSearch(value)}
          style={{
            fontFamily: 'poppins',
            fontSize: 16,
            flex: 1,
            color: Colors.PRIMARY_GRAY
          }}
        />
      </View>
      <View style={styles.iconWrapper}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.push('/home')}
        >
          <Entypo 
            name="home" 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
        <View style={{gap: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{position: 'relative'}}
            onPress={handleOptionsPress}
          >
            <Entypo name="list" size={24} color="white"/>
            <OptionsModal 
              show={isOptionsModalShow} 
              onClose={() => setIsOptionsModalShow(false)}
              style={styles.optionsModal}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.6}
            style={{position: 'relative', zIndex: -1}}
            onPress={handleFilterPress}
          >
            <FontAwesome name="filter" size={24} color="white" />
            <FilterModal 
              show={isFilterModalShow} 
              onClose={() => setIsFilterModalShow(false)}
              style={styles.filterModal}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  iconWrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10
  },
  optionsModal: {
    position: 'absolute',
    right: 20,
    top: 28,
    minWidth: 130, 
  },
  filterModal: {
    position: 'absolute',
    right: 18,
    top: 28,
    minWidth: 130, 
  },
})