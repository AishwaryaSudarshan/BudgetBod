import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import checkJwt from "./middleware/authCheck";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

root.render(
    <Auth0Provider
      domain="dev-pwbv7kl3hlgsyn4c.us.auth0.com"
      clientId="0wJO3AmME3X6Njoo6oMemHpMp036zO8M"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/home"
      }}
    >
      <App />
    </Auth0Provider>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
