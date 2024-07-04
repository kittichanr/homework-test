import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import LeaderBoard from './pages/LeaderBoard';
import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen
            options={{headerShown: false, gestureEnabled: false}}
            name="LeaderBoard"
            component={LeaderBoard}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
