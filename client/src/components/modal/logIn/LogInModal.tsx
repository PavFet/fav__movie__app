import React from 'react'
import './logInModal.scss'
import http from '../../../plugins/http';
import { useAppDispatch } from '../../../features/hooks';
import { setUser } from '../../../features/userSlice';

interface ModalProps {
  onToggle: () => void;
}

const LogInModal: React.FC<ModalProps> = ({ onToggle }) => {
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false)
  
  const disp = useAppDispatch();

  const handleLogin = async () => {
    const userData = {
      _id: '',
      username,
      password,
      movieList: []
    }
    await http.post(userData, 'user/login')
      .then(data => {
        console.log(data)
        if(data.statusCode > 200 || data.error) {
          setLoginError('Wrong credentials')
        } 
        else {
          disp(setUser(data.user))
          onToggle()
        }
        
      })
  };
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h2>Login to your account</h2>
        <input
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : "password"}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <label htmlFor="password">{loginError}</label>}
        <button onClick={handleLogin} className='modal__content__login--btn'>Login
        </button>
        <div className="show__password">
          <button onClick={() => setShowPassword(!showPassword)}>
          &#128065; 
          </button>
        </div>
        <div className="close__modal">
          <button onClick={onToggle} className='close__modal--btn'>&#10006;</button>
        </div>
      </div>
    </div>
  )
}

export default LogInModal