import React, {useContext, useState, useEffect} from 'react';
import {StatusBar, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../RN_login_With_Nav_ContextApi/screens/LogingScreen';
import SignupScreen from '../RN_login_With_Nav_ContextApi/screens/SignupScreen';
import WelcomeScreen from '../RN_login_With_Nav_ContextApi/screens/WelcomeScreen';
import {Colors} from './constants/styles';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({tintColor}) => (
            <Button
              title="exit"
              size={24}
              color="white"
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticate && <AuthStack />}
      {authCtx.isAuthenticate && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="Welcome Screen..." />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
