import HeadBar from '@/components/headbar';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);
export default function Sequence() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }))

  const handleSequence = () => {
    rotation.value = withSequence(
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      withRepeat(
        withTiming(ANGLE, { duration: TIME, easing: EASING }),
        7,
        true
      ),
      withTiming(0, { duration: TIME / 2, easing: EASING }),
    )
  }

  return <React.Fragment>
    <HeadBar title='Sequence' />
    <View className='flex-1 items-center  gap-4 p-8'>
      <View className='justify-center w-full items-center p-4'>
        <Animated.View
          className='bg-red-500 w-36 h-36 rounded-2xl items-center justify-center'
          style={animatedStyle}
        >
          <Text className='text-white text-6xl font-bold'>👋</Text>
        </Animated.View>
      </View>
      <Pressable onPress={handleSequence} className='bg-zinc-900 p-4 rounded-2xl items-center justify-center w-full'>
        <Text className='text-white text-lg font-bold'>Wobble</Text>
      </Pressable>
    </View>
  </React.Fragment>

}