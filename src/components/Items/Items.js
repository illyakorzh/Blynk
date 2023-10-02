import s from "./Items.module.css";
import { useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../../Store/reducers/userReducer';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Input,  } from '@mui/material';



export const Items = memo(({ userState, selectedUser, setSelectedUser, }) => {


  const dispatch = useDispatch();

  const addName = ({ name }) => {
    dispatch(addUser(name));
  };

  const addSelectID = (id) => {
    setSelectedUser(id);
    if (selectedUser !== id) {
      localStorage.setItem('selectedUser', id);
    }
  };
  const buttonDeleteUser = (event, id) => {
    event.stopPropagation();
    dispatch(deleteUser(id));
  };
  const { register, handleSubmit, formState: { errors, isValid, }, } = useForm({ mode: 'onChange' });
  return (<div className={s.reactItems}>
    <h1 className={s.items}>Items</h1>
    <form
      className={s.reactItemsInputGroup}
      onSubmit={handleSubmit(addName)}
    >
      <div
        style={{
          width: '100%', display: 'flex',
        }}
      >
        <Input
          className={s.formControl}
          {...register("name", {
            required: { value: true, message: "Name is required" },
            pattern: { value: /^[A-Z][a-z]*$/, message: "Name must start with capital letter" },
            minLength: { value: 4, message: "Name must be at least 3 symbols" },
            maxLength: { value: 10, message: "Name must be at most 10 symbols" },
          })} />

        <Button disabled={!isValid} type="submit" variant="contained">Submit</Button>
      </div>
      {errors.name && <Alert
        style={{
          marginLeft: '10px',
        }} severity="error"
      >{errors.name.message} </Alert>}
    </form>

    <ul className={s.listGroup}>
      {Object.keys(userState).length ? Object.keys(userState).map(key => <li
        key={key}
        onClick={() => addSelectID(userState[key].id)}
        className={`${s.listGroupItem} ${selectedUser === userState[key].id ? s.listGroupItemSelected : ''}`}
      >
        <span>{userState[key].name}</span>
        <div className={s.rightSide}>
          <span className={s.commentsLength}>{userState[key].comments.length}</span>
          <button
            className={s.buttonDelete}
            onClick={(event) => buttonDeleteUser(event, userState[key].id)}
          >Delete
          </button>
        </div>
      </li>) : ""}
    </ul>
  </div>);
});