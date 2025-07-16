import React from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function Timing() {
  const dimensions = Dimensions.get("window")

  const offset = useSharedValue(0)

  const TO_VALUE = dimensions.width - 144 - 32 - 16 - 16
  const DURATION = 500 // Default is 300
  const EASE = Easing.inOut(Easing.exp)

  /*
  144 = Box width
  32 = Layout Padding
  16 = Box Margin
  16 = Gap
  */


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  const handleMove = () => {
    offset.value = withTiming(TO_VALUE, { duration: DURATION, easing: EASE })
  }

  const handleReset = () => {
    offset.value = withTiming(0, { duration: DURATION, easing: EASE })
  }


  return <View className='flex-1 items-center  gap-4 p-8'>
    <Text className='text-2xl font-bold'>Timing</Text>

    <View className='justify-start bg-black/15 w-full items-start p-4'>
      <Animated.View className='bg-red-500 w-36 h-36 rounded-2xl'
        style={animatedStyle}
      />
    </View>

    <Pressable onPress={handleMove} className='bg-zinc-900 p-4 rounded-2xl items-center justify-center w-full'>
      <Text className='text-white text-lg font-bold'>Move</Text>
    </Pressable>
    <Pressable onPress={handleReset} className='bg-zinc-900 p-4 rounded-2xl items-center justify-center w-full'>
      <Text className='text-white text-lg font-bold'>Reset</Text>
    </Pressable>
  </View>

}