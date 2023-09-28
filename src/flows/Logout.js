import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, InputLabel, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import logo from './logo.png';
import { useNavigate,Navigate } from 'react-router-dom';
import Circle from './Circle';

const PageContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const LeftContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '20px',
  width: '30%',
});

const Logo = styled('img')({
  width: '80px',
  height: '80px',
  marginBottom: '20px',
  zIndex:'1',
});

const RightContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const LoginContainer = styled(Box)({
  backgroundColor: '#fcf7fc',
  width: '300px',
  height: '200px',
  borderRadius: '10px',
  padding: '20px',
  opacity: '80%',
  boxShadow: '3px 3px 3px 3px grey',
});

const CustomInput = styled(Input)({
  width: '100%',
  padding: '5px 12px',
  borderRadius: '5px',
  border: '1px solid black',
  '&:focus': {
    borderColor: 'black',
    boxShadow: 'none',
  },
});

const CustomInputLabel = styled(InputLabel)({
  alignSelf: 'flex-start',
  marginTop: '10px',
  marginBottom: '5px',
  fontFamily: 'open-sans',
  color: 'black',
});

const Heading = styled(Typography)({
  fontWeight: 'bold',
  fontFamily: 'open-sans',
  marginTop: '1px',
  marginBottom: '3px',
  fontSize: '2rem',
});

const RequestOTPButton = styled(Button)({
  marginTop: '10px',
  fontFamily: 'open-sans',
  width: '100%',
  padding: '5px 12px',
});

const LoginButton = styled(Button)({
  marginTop: '10px',
  fontFamily: 'open-sans',
  width: '100%',
  padding: '5px 12px',
});

function Login() {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [email, setEmail] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [sessionId,setSessionId] =useState();



  const handleRequestOTPClick = async () => {
    try {
      const response = await axios.post(`https://api.p360.build:9003/v1/user/authenticateUser/${email}`);
      const generatedOTP = response.data;
      setSessionId(response.data.sessionId)
      setGeneratedOTP(generatedOTP);
      setShowOTPInput(true);
    } catch (error) {
      console.error('Error fetching OTP:', error);
      alert('Error fetching OTP. Please check the console for details.');
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      console.log('Login button clicked');
  
      // if (!otp || otp !== generatedOTP) {
      //   setIsOtpValid(false);
      //   console.log('Invalid OTP');
      //   return;
      // }
      const response = await axios.post(`https://api.p360.build:9003/v1/user/respondToAuthChallenge`, {
        email:email, 
        session:sessionId,
        confirmationCode:otp,
      });
      // return <Navigate to="/dashboard"/>;
      if (response.status === 200) {
        console.log('Login successful'); 
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("idToken", response.data.idToken);
        // localStorage.getItem("accessToken",response.data.token);
        navigate('/dashboard'); 
      } else {
        console.error(`Received status code ${response.status}`);
      }
      
    } catch (error) {
      console.error('Error responding to authentication challenge:', error);
      alert('Error responding to authentication challenge. Please check the console for details.');
    }
  };
  

  return (
    <PageContainer>
      <Circle />
      <LeftContainer>
        <Logo src={logo} alt="Logo" />
      </LeftContainer>
      <RightContainer>
        <LoginContainer>
          <Heading variant="h3">Login</Heading>
          {!showOTPInput && (
            <>
              <CustomInputLabel htmlFor="email">Email</CustomInputLabel>
              <CustomInput
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <RequestOTPButton variant="contained" color="primary" onClick={handleRequestOTPClick}>
                Request OTP
              </RequestOTPButton>
            </>
          )}
          {showOTPInput && (
            <>
              <CustomInputLabel htmlFor="otp">Enter OTP</CustomInputLabel>
              <CustomInput
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!isOtpValid}
                placeholder=""
              />
              <LoginButton variant="contained" color="primary" onClick={handleLoginClick}>
                Login
              </LoginButton>
            </>
          )}
        </LoginContainer>
      </RightContainer>
    </PageContainer>
  );
}

export default Login;
