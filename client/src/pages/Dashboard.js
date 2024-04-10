import React from 'react';
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Dashboard() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
  );
}

export default withAuthenticationRequired (Dashboard, {
  onRedirecting: () => <Loading />,
});
