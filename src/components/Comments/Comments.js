import s from "./Comments.module.css";
import { useDispatch } from 'react-redux';
import { addComment } from '../../Store/reducers/userReducer';
import { useState } from 'react';

export const Comments = ({ userState, selectedUser }) => {
  const dispatch = useDispatch();
  const comments = userState[selectedUser]?.comments || [];
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("#2b2f3e");
  const idForComment =  (Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000).toString();

  const addCommentToState = (event) => {

    if (selectedUser && comment.trim().length > 0) {
      event.preventDefault();
      dispatch(addComment({ id: selectedUser,idForComment, comment: comment.trim(), color }));
      setComment("");
    }
  };

  return (<div className={s.commentWrapper}>
    <h1 className={s.title}>Comments #{selectedUser.length === 8 ? `${selectedUser}` : ''}</h1>
    <div className={s.reactComment}>
      {comments ? comments.map(({ id,comment, color }) => <div key={id} className={s.card}>
        <div className={s.cardColor} style={{ backgroundColor: `${color}` }}></div>
        <pre className={s.cardText}>{comment}</pre>
      </div>) : ''}
    </div>
    <form className={s.reactItemsInputGroup}>
      <input
        type="color"
        value={color}
        className={s.color}
        onChange={(event) => setColor(event.target.value)}
      />
      <textarea
        className={s.comment}
        placeholder="Type comment here..."
        required
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button
        disabled={!selectedUser}
        className={s.buttonAddComment}
        onClick={addCommentToState}
      >
        Add New
      </button>
    </form>
  </div>);
};