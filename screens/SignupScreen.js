import React, {useState, useContext} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import {Alert} from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../store/auth-context';
function SignupScreen() {
  //loading
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //store the variable;
  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);

      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Could not log you in please check your credntials input or try  again later',
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user...." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
