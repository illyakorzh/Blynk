import s from './MainPage.module.css';
import { Items } from '../../components/Items/Items';
import { Comments } from '../../components/Comments/Comments';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const MainPaige = () => {
  const userState = useSelector(state => state.user);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const idLocalStoredUser = localStorage.getItem('selectedUser');
    if (idLocalStoredUser && userState[idLocalStoredUser]) {
      setSelectedUser(idLocalStoredUser);
    }
  }, []);

  useEffect(() => {
    const lengthUserIdArr = Object.keys(userState).length;
    const userIdArr = Object.keys(userState);
    const idLastUser = userIdArr[lengthUserIdArr - 1];
    const idLocalStoredUser = localStorage.getItem('selectedUser');

    //если нет выбранного пользователя в стейте
    if (!userState[selectedUser]) {
      //если локальное хранилище не пустое
      if (userState[idLocalStoredUser]) {
        setSelectedUser(idLocalStoredUser);
        //если в стейте есть пользователи
      } else if (lengthUserIdArr) {
        localStorage.setItem('selectedUser', idLastUser);
        setSelectedUser(idLastUser);
      } else {
        setSelectedUser('');
        localStorage.removeItem('selectedUser');
      }
    }

  }, [userState,]);

  return (<div className={s.mainPageWrapper}>
    <aside className={s.aside}>
      <h1 className={s.title}>DAYRY APP </h1>
      <span className={s.subTitle}>Comment with no sense</span>
    </aside>
    <div className={s.body}>
      <Items userState={userState} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Comments userState={userState} selectedUser={selectedUser} />
    </div>
  </div>);
};

