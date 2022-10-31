import React, {useState} from 'react';
import Background from '../../component/Background';
import SnakbarComponent from '../../component/SnackbarComponent';
import BackHeader from './BackHeader';
import EmailResetPassword from './EmailResetPassword';
import PasswordToken from './PasswordToken';

const ResetPasswordScreen = ({navigation}) => {
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(true);
  const [tokensent, setTokensent] = useState(false);

  return (
    <Background>
      {tokensent ? (
        <PasswordToken
          setDanger={setDanger}
          setContent={setContent}
          setShowSnack={setShowSnack}
          donePress={() => {navigation.replace('Login')}}
        />
      ) : (
        <>
          <BackHeader backPress={() => navigation.replace('Login')} />
          <EmailResetPassword
            setShowSnack={setShowSnack}
            setContent={setContent}
            setDanger={setDanger}
            setTokensent={setTokensent}
          />
        </>
      )}

      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
        danger={danger}
      />
    </Background>
  );
};

export default ResetPasswordScreen;
