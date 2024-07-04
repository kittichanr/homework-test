import {TextInput, Text, SafeAreaView, Button} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [name, setName] = useState('');

  const navigation = useNavigation<any>();

  const gotoQuiz = () => {
    navigation.navigate('Quiz', {name: name});
    setName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button title="Enter" onPress={gotoQuiz} disabled={name.length < 1} />
    </SafeAreaView>
  );
};

export default Home;
