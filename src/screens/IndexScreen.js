import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';

import { Context } from '../context/BlogContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    //refetch the component to get newly posted post
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    //cleanup after the useEffect
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
              <View style={styles.post}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.id}>{item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <MaterialIcons name="delete" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus-circle" style={styles.plus} />
      </TouchableOpacity>
    ),
  };
};

export default IndexScreen;

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  icon: {
    fontSize: 20,
    zIndex: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 12,
  },
  plus: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
  },
});
