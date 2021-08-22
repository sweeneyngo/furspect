import './src/styles/global.css';

// cognito
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './src/aws-exports';
Amplify.configure(awsConfig);
