import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './screen/main';
import ListItem from './screen/ListItem';
import Report from './screen/report'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper'
import { store } from './screen/redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                options={{
                  headerShown: false
                }} 
                name="Donation 1.0" 
                component={Main} 
              />
              <Stack.Screen 
                options={{
                  headerShown: false
                }}  
                name="List Item" 
                component={ListItem} 
              />
              <Stack.Screen 
                options={{
                  headerShown: false
                }}  
                name="Report" 
                component={Report} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}

