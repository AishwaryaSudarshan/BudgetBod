import React from 'react';
import Card from '../components/Card';
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import queryString from "qs";


const Homepage = ({ location }) => {
  const { isAuthenticated } = useAuth0();
  const { code } = queryString.parse(location);
    
  return (
    <>
      <div className='flex justify-center'>
      <img src='homepage.svg' alt='img'/>
      </div>
        <div className="flex justify-center gap-x-16 mt-8">
          <Card
            title="Dashboard"
            description="Keep track of what goes into your body. We take the calories you consume and activities you do throughout the day and use it to update your goals."
            icon="dashboardIcon.svg"
            redirectTo="/dashboard"
          />
          <Card
            title="Preferences"
            description="Keep track of the calories you burn. We take your fitness into account for your daily progress tracker. "
            icon="preferencesIcon.svg"
            redirectTo="/settings"
          />
          <Card
            title="Curated Recipes"
            description="We proved you personally designed meals based on your preferences and dietary restrictions."
            icon="recipesIcon.svg"
            redirectTo="/recipes"
          />
        </div>
        </>
  );
}

export default withAuthenticationRequired (Homepage, {
  onRedirecting: () => <Loading />,
});
