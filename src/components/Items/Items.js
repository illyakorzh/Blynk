import s from "./Items.module.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../../Store/reducers/userReducer';

export const Items = ({ userState, selectedUser, setSelectedUser, }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const addName = (event) => {
    if (name.trim().length > 0) {
      event.preventDefault();
      dispatch(addUser(name.trim()));
      setName('');
    }
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
  return (<div className={s.reactItems}>
    <h1 className={s.items}>Items</h1>
    <form className={s.reactItemsInputGroup}>
      <input
        className={s.formControl}
        type="text"
        placeholder="Type name here..."
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <button className={s.buttonInfo} onClick={addName}>Add New</button>
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
};