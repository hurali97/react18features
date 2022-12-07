import React, {Suspense, useState, useTransition} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
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
    <View>
      <Suspense fallback={<Text>Loading the app...</Text>}>{page}</Suspense>
    </View>
  );
};

export default StartTransitionWithSupense;

const styles = StyleSheet.create({
  input: {borderWidth: 0.5, padding: 6, color: '#000'},
  item: {padding: 10},
});

const HomePage = ({showProfile}) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button onPress={showProfile} title="Open Profile" />
    </View>
  );
};

const ProfilePage = ({resource}) => {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<Text>Loading posts...</Text>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<Text>Loading fun facts...</Text>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
};

const ProfileDetails = ({resource}) => {
  const user = resource.user.read();
  return <Text>{user.name}</Text>;
};

const ProfileTimeline = ({resource}) => {
  const posts = resource.posts.read();
  return (
    <View>
      {posts.map(post => (
        <Text key={post.id}>{post.text}</Text>
      ))}
    </View>
  );
};

const ProfileTrivia = ({resource}) => {
  const trivia = resource.trivia.read();
  return (
    <>
      <Text>Fun Facts</Text>
      <View>
        {trivia.map(fact => (
          <Text key={fact.id}>{fact.text}</Text>
        ))}
      </View>
    </>
  );
};
