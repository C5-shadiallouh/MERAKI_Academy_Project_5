import { createSlice } from "@reduxjs/toolkit";

export const comment = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      //payload:all comments
      state.comments = action.payload;
    },

    addNewComment: (state, action) => {
        //payload:newComment
        state.comments.push(action.payload);
      },
  
      updateComment: (state, action) => {
        //payload:updated-Comment
        state.comments = state.comments.map((comment) => {
          if (comment.id == action.payload) {
            return { ...comment, ...action.payload };
          }
        });
      },
  
      deleteComment: (state, action) => {
        //payload : id
        state.comments = state.comments.filter((comment) => {
          return comment.id != action.payload;
        });
      },

   
  },
});


export const { setComments, addNewComment, updateComment, deleteComment} = comment.actions;

export default comment.reducer;