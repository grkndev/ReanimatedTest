import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Icons from './ui/icons'

export default function HeadBar({ title }: { title: string }) {
    const router = useRouter()
    return (
        <View className='flex-row justify-center items-center  h-16 p-4'>
            {
                router.canGoBack() && (
                    <View className='flex-1 h-full items-start justify-center '>
                        <Pressable onPress={() => router.back()}>
                            <Icons name='ChevronLeft' size={24} color='black' />
                        </Pressable>
                    </View>
                )
            }
            <View className='flex-1 h-full items-center justify-center '>
                <Text className='font-bold text-xl'>{title}</Text>

            </View>
            {
                router.canGoBack() && (
                    <View className='flex-1 h-full items-end justify-center '>
                        
                    </View>
                )
            }
        </View>
    )
}