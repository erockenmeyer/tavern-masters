import React from 'react';
import { Navigate, useParams } from "react-router-dom";

// import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";

import { useQuery
  // , useMutation 
} from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = (props) => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });
  
      const user = data?.me || data?.user || {};
  
      // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user?.username) {
        return (
          <h4>
            Please log in to see this page.  Sign up or log in above!
          </h4>
        );
      }

    return (
      <div>
        <div className="">
          <h2 className="">
            {userParam ? `${user.username}'s` : 'your'} profile.
          </h2>
        </div>
  
        <div className="">
          <div className="">
            <CampaignList campaigns={user.campaigns} title={`${user.username}'s campaigns...`} />
          </div>
        </div>
        {/* <div className="mb-3">{!userParam && <CampaignForm />}</div> */}
      </div>
    );
  };

export default Profile;