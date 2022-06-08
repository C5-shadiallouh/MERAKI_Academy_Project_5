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
            return { ...comments, ...action.payload };
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


export const { setComments, addNewComment, updateComment, deleteComment} = comments.actions;

export default comments.reducer;