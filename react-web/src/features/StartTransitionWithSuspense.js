import React, {Suspense, useState, useTransition} from 'react';
import {fetchProfileData} from '../api/fakeApi';

const initialResource = fetchProfileData(0);

const StartTransitionWithSupense = () => {
  const [tab, setTab] = useState('home');
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  const showProfile = id => {
    startTransition(() => {
      setResource(fetchProfileData(id));
      setTab('profile');
    });
  };

  let page;
  if (tab === 'home') {
    page = <HomePage showProfile={showProfile} />;
  } else if (tab === 'profile') {
    page = <ProfilePage resource={resource} />;
  }

  console.log('isPending ', isPending);
  return (
    <div>
      <Suspense fallback={<p>Loading the app...</p>}>{page}</Suspense>
    </div>
  );
};

export default StartTransitionWithSupense;

const HomePage = ({showProfile}) => {
  return (
    <div>
      <p>Home Page</p>
      <button onClick={showProfile}>
      Open Profile
        </button>
    </div>
  );
};

const ProfilePage = ({resource}) => {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<p>Loading posts...</p>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<p>Loading fun facts...</p>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
};

const ProfileDetails = ({resource}) => {
  const user = resource.user.read();
  return <p>{user.name}</p>;
};

const ProfileTimeline = ({resource}) => {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
};

const ProfileTrivia = ({resource}) => {
  const trivia = resource.trivia.read();
  return (
    <>
      <p>Fun Facts</p>
      <ul>
        {trivia.map(fact => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
};
