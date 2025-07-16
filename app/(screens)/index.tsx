import HeadBar from "@/components/headbar";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";


export default function Home() {

  return <React.Fragment>
    <HeadBar title='Home' />
    <FlatList data={Screens}
      renderItem={({ item }) => <Link href={item.href as any} asChild>
        <Text className="bg-blue-500 rounded-2xl text-white text-center p-4">{item.name}</Text>
      </Link>}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10 }}
      className="p-4"
    />
  </React.Fragment>

}

const Screens: { id: number, name: string, href: string }[] = [
  {
    id: 1,
    name: 'With Spring',
    href: '/(screens)/with-spring'
  },
  {
    id: 2,
    name: 'With Timing',
    href: '/(screens)/with-timing'
  },
  {
    id: 3,
    name: 'With Sequence',
    href: '/(screens)/with-sequence'
  },
  {
    id: 4,
    name: 'With Delay',
    href: '/(screens)/with-delay'
  }
]