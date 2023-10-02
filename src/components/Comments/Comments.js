import s from "./Comments.module.css";
import { useDispatch } from 'react-redux';
import { addComment } from '../../Store/reducers/userReducer';
import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Input, TextField } from '@mui/material';

export const Comments = memo(function ({ userState, selectedUser }) {
  const { register, handleSubmit, formState: { errors, isValid, }, } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const comments = userState[selectedUser]?.comments || [];
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("#2b2f3e");
  const idForComment = (Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000).toString();

  const addCommentToState = (event) => {


      dispatch(addComment({ id: selectedUser, idForComment, comment: comment.trim(), color }));


  };

  return (<div className={s.commentWrapper}>
    <h1 className={s.title}>Comments #{selectedUser.length === 8 ? `${selectedUser}` : ''}</h1>
    <div className={s.reactComment}>
      {comments ? comments.map(({ id, comment, color }) => <div key={id} className={s.card}>
        <div className={s.cardColor} style={{ backgroundColor: `${color}` }}></div>
        <pre className={s.cardText}>{comment}</pre>
      </div>) : ''}
    </div>

    <form

      onSubmit={handleSubmit(addCommentToState)}
    >
      <div
        style={{
          width: '100%', display: 'flex',gap: '10px',padding: '0 10px',
        }}
      >
        <Input type="color" className={s.color} {...register("color")} />

        <Input
          style={{width: '100%'}}
          type="textField"
          placeholder="Type comment here..."
          {...register("comment", {
            required: { value: true, message: "Comment is required" },

          })} />

        <Button disabled={!isValid} type="submit" variant="contained">Submit</Button>
      </div>
      {errors.name && <Alert
        style={{
          marginLeft: '10px',
        }} severity="error"
      >{errors.name.message} </Alert>}
    </form>

  </div>);
});

