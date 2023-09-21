import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', initialState: {}, reducers: {
    addUser: (state, action) => {
      const name = action.payload;
      const id = (Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000).toString();
      state[id] = { id, name, comments: [] };
    }, deleteUser: (state, action) => {
      const id = action.payload;
      delete state[id];
    }, addComment: (state, action) => {
      const { id, idForComment, comment, color } = action.payload;
      state[id].comments.push({ id: idForComment, comment, color });
    },
  },
});

export const { addUser, deleteUser, addComment } = userSlice.actions;
export default userSlice.reducer;
