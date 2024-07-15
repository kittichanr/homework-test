import {View, Text, SafeAreaView, FlatList, Button} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import {Question, questionList, shuffle} from '../../utils/questionList';
import {Modal, Portal, RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LeaderBoard} from '../LeaderBoard';

const Quiz = () => {
  const [question, setQuestion] = useState<Question[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    navigation.navigate('LeaderBoard');
  };

  useEffect(() => {
    setQuestion(shuffle(questionList));
  }, []);

  const result = useMemo(
    () => question.filter((q, i) => q.answer == answer[i]),
    [answer],
  );

  const onSubmit = async () => {
    showModal();

    let storedItem: LeaderBoard[] = [];
    try {
      const leaderBoard = await AsyncStorage.getItem('LEADER_BOARD');
      storedItem = JSON.parse(leaderBoard || '[]');
      storedItem.push({name: route.params?.name, score: result.length});
      storedItem.sort((a, b) => b.score - a.score);
    } catch (e) {
      console.warn(e);
    }

    try {
      await AsyncStorage.setItem('LEADER_BOARD', JSON.stringify(storedItem));
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Text style={styles.scoreText}>Score</Text>
          <Text>{result.length}/20</Text>
        </Modal>
      </Portal>
      <Text style={{marginBottom: 8}}>Name: {route.params?.name}</Text>
      <FlatList
        data={question}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <View>
              <Text>{item.question}</Text>
              <RadioButton.Group
                onValueChange={newValue => {
                  answer[index] = newValue;
                  setAnswer(
                    answer.map((item, i) => (i === index ? newValue : item)),
                  );
                }}
                value={answer[index]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value={item.choices[0]}
                    status={
                      item.choices[0] == answer[index] ? 'checked' : 'unchecked'
                    }
                  />
                  <Text>{item.choices[0]}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value={item.choices[1]}
                    status={
                      item.choices[1] == answer[index] ? 'checked' : 'unchecked'
                    }
                  />
                  <Text>{item.choices[1]}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value={item.choices[2]}
                    status={
                      item.choices[2] == answer[index] ? 'checked' : 'unchecked'
                    }
                  />
                  <Text>{item.choices[2]}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android
                    value={item.choices[3]}
                    status={
                      item.choices[3] == answer[index] ? 'checked' : 'unchecked'
                    }
                  />
                  <Text>{item.choices[3]}</Text>
                </View>
              </RadioButton.Group>
            </View>
          );
        }}
      />
      <Button
        title="Submit"
        onPress={onSubmit}
        disabled={answer.length != 20}
      />
    </SafeAreaView>
  );
};

export default Quiz;
