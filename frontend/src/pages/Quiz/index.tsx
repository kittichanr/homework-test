import {View, Text, SafeAreaView, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import {Question, questionList, shuffle} from '../../utils/questionList';
import {RadioButton} from 'react-native-paper';

const Quiz = () => {
  const [question, setQuestion] = useState<Question[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);

  const route = useRoute<any>();

  useEffect(() => {
    setQuestion(shuffle(questionList));
  }, []);

  const onSubmit = () => {
    const result = question.filter((q, i) => q.answer == answer[i]);

    // set modal
    // set value to async storage
  };

  return (
    <SafeAreaView style={styles.container}>
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
                  <RadioButton.Android value={item.choices[2]} />
                  <Text>{item.choices[2]}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android value={item.choices[3]} />
                  <Text>{item.choices[3]}</Text>
                </View>
              </RadioButton.Group>
            </View>
          );
        }}
      />
      <Button title="Submit" onPress={onSubmit} />
    </SafeAreaView>
  );
};

export default Quiz;
