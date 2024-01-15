import React from 'react'
import './SignInModal.scss'
import http from '../../../plugins/http';
import { setUser } from '../../../features/userSlice';
import { useAppDispatch } from '../../../features/hooks';

interface ModalProps {
  onToggle: () => void;
}

const LogInModal: React.FC<ModalProps> = ({ onToggle }) => {
  const disp = useAppDispatch();

  const [username, setUsername] = React.useState('');
  const [firstPassword, setFirstPassword] = React.useState('');
  const [secondPassword, setSecondPassword] = React.useState('');

  const [usernameError, seUsernameError] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')
  const [reqError, setReqError] = React.useState('')

  const register: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newAcc = {
      username: username,
      password: firstPassword,
      movieList: []
    }

    let correctUsername = false;
    let correctPass = false;

    if(username.length < 3) {
      seUsernameError('Too short username. Min 3 symbols')
    } else if(username.length > 30 ) {
      seUsernameError('Too long username. Max 30 symbols')
    } else {
      seUsernameError('')
      correctUsername = true
    }
    
    if(!/[A-Z]/.test(firstPassword)) {
      setPasswordError('Password must contain an uppercase letter')
    } else if(firstPassword.length < 5){
      setPasswordError('Too short password')
    } else if(!/[0-9]/.test(firstPassword)){
      setPasswordError('Password must contain a number')
    } else if(firstPassword !== secondPassword){
      setPasswordError(`Passwords don't match`)
    }
    else {
      setPasswordError('')
      correctPass = true
    }
  
    if (correctPass && correctUsername) {
      await http.post(newAcc, 'user/register')
        .then(data => {
          if(data.error) {
            setReqError(data.message)
          } else {
            disp(setUser(data.newUser))
            onToggle()
          }
        }
        )
     
    }
  }

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h2>Create account</h2>
        <form 
          onSubmit={register}
          className='modal__content__form'
        >
          <input
            id='username'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError &&  <label htmlFor="username">{usernameError}</label>}
          <input
            type="password"
            placeholder='Password'
            value={firstPassword}
            onChange={(e) => setFirstPassword(e.target.value)}
          />
          <input
            id='password'
            type="password"
            placeholder='Repeat password'
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
          {passwordError && <label htmlFor="password">{passwordError}</label>}
          {reqError && <label>{reqError}</label>}
          <button type='submit' className='modal__content__login--btn'>Register
          </button>
          <div className="close__modal">
            <button onClick={onToggle} className='close__modal--btn'>&#10006;</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogInModal