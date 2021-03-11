import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <Text style={styles.label}>Enter Text:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => {
          setContent(text);
        }}
      />
      <Button title="Save Blog Post" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
};

export default BlogPostForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 16,
    marginHorizontal: 2,
    padding: 3,
    borderRadius: 4,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    marginHorizontal: 5,
  },
});
