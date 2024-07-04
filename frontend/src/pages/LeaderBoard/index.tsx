import {View, Text, SafeAreaView, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export type LeaderBoard = {
  name: string;
  score: number;
};

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>();
  const getLeaderBoard = async () => {
    try {
      const leaderBoard = await AsyncStorage.getItem('LEADER_BOARD');
      setLeaderBoard(JSON.parse(leaderBoard || '[]'));
    } catch (e) {
      console.warn(e);
    }
  };

  const navigation = useNavigation<any>();

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>LeaderBoard</Text>
      <FlatList
        data={leaderBoard}
        renderItem={({item}) => {
          return (
            <View style={styles.scoreItem}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.score}</Text>
            </View>
          );
        }}
      />
      <Button title="Try Again" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

export default LeaderBoard;
