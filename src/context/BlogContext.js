import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      //the return statement below filters the blogPost array
      //if the blogPost.id is not equal the id that is being deleted (action.payload)
      //then keep that post on the array and return the new array.  d
      return state.filter((blogPost) => blogPost.id !== action.payload);

    //case no longer needed after the implementation of jsonServer Api
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 999999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => async () => {
  const res = await jsonServer.get('/blogposts');

  dispatch({ type: 'get_blogposts', payload: res.data });
};

//shorter version of the function
//making use of the implicit return by removing the brackets and return statement
const addBlogPost = (dispatch) => async (title, content, callback) => {
  await jsonServer.post('/blogposts', { title, content });
  if (callback) {
    callback();
  }
};

const deleteBlogPost = (dispatch) => async (id) => {
  await jsonServer.delete(`/blogposts/${id}`);
  dispatch({ type: 'delete_blogpost', payload: id });
};

const editBlogPost = (dispatch) => async (id, title, content, callback) => {
  await jsonServer.put(`/blogposts/${id}`, { title, content });
  dispatch({
    type: 'edit_blogpost',
    payload: { id, title, content },
  });
  if (callback) {
    callback();
  }
};

// const addBlogPost = (dispatch) => {
//   return () => {
//     dispatch({ type: 'add_blogpost' });
//   };
// };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
