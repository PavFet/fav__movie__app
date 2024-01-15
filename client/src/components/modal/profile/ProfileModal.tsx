import React, { Dispatch, SetStateAction } from 'react'
import './profileModal.scss'
import { useAppDispatch, useAppSelector } from '../../../features/hooks';
import ConfirmationModal from '../confirmation/ConfirmationModal';
import http from '../../../plugins/http';
import { logOut } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  onToggle: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onToggle }) => {

  const [password, setPassword] = React.useState('')
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);
  const user = useAppSelector(state => state.user.userData)
  const [error, setError] = React.useState('')

  const nav = useNavigate()
  const disp = useAppDispatch()
  
  const toggleModal = (setModal: Dispatch<SetStateAction<boolean>>, value: boolean) => {
    setModal(!value)
  }


  const isPasswordInputEmpty = () => {
    if(password.length === 0) {
      setError('Enter your password')
    } else {
      toggleModal(setIsConfirmationModalOpen, isConfirmationModalOpen)
    }
  }
 
  const deleteUser = async () => {
    await http.delete({userId: user._id, password}, 'user/deleteUser')
      .then(data => {
        if(!data.error) {
          disp(logOut())
          onToggle()
          setIsConfirmationModalOpen(!isConfirmationModalOpen)
          nav('/')
        } else {
          setIsConfirmationModalOpen(!isConfirmationModalOpen)
          setPassword('')
          setError('Wrong password')
          console.log('wrong password')
        }
      })
  }
  return (
    <div className="modal__overlay">
      <div className="profile__modal__content">
        <h2>Your profile</h2>
        <h6>Username: <span>{user.username}</span></h6>
        <h6>Number of favorite movies: <span>{user.movieList.length}</span></h6>
        <p>If you want to delete your account, enter your password and press the delete button</p>
        <input className='input__password' placeholder='Enter password' type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        {error && <span className='profile__modal__error'>{error}</span>}
        <button className='button__delete' onClick={isPasswordInputEmpty}>Delete</button>
        <div className="close__modal">
          <button onClick={onToggle} className='close__modal--btn'>&#10006;</button>
        </div>
      </div>
      {isConfirmationModalOpen && <ConfirmationModal onConfirm={deleteUser} onToggle={() => toggleModal(setIsConfirmationModalOpen, isConfirmationModalOpen)}></ConfirmationModal>}
    </div>
  )
}

export default ProfileModal