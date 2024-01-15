import React from 'react'
import './header.scss'
import LogInModal from '../modal/logIn/LogInModal';
import SignInModal from '../modal/signIn/SigInModal'
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { logOut } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import ProfileModal from '../modal/profile/ProfileModal';

const Header = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isProfileModalOpen, setIsProfileInModalOpen] = React.useState(false);

  const user = useAppSelector(state => state.user.userData)
  const disp = useAppDispatch()

  const toggleModal = (setModal: any, value: boolean) => {
    setModal(!value)
  }
  
  return (
    <header>
      <div className="logo">FavMovies</div>
      <nav>
        <ul className='navigation'>
          { user.username.length > 0 
            ? 
            <>
              <li className='welcome'>Welcome, {user.username}</li>
              <li>
                <Link to='/' >Home</Link>
              </li>
              <li>
                <Link className='your__list' to='/list'>
                  Your list
                  <span>{user.movieList.length}</span>
                </Link>
              </li>
              <li>
                <button onClick={() => toggleModal(setIsProfileInModalOpen, isProfileModalOpen)} >Profile</button>
              </li>
              <li>
                <Link to='/' onClick={() => disp(logOut())}>Log out</Link>
              </li>
            </>
            :
            <>
              <li><button onClick={() => toggleModal(setIsLoginModalOpen, isLoginModalOpen)} >Log in</button></li>
              <li><button onClick={() => toggleModal(setIsSignInModalOpen, isSignInModalOpen)}>Sign in</button></li>
            </>
          }
        </ul>
      </nav>
      {isLoginModalOpen && <LogInModal onToggle={() => toggleModal(setIsLoginModalOpen, isLoginModalOpen)} />}
      {isSignInModalOpen && <SignInModal onToggle={() => toggleModal(setIsSignInModalOpen, isSignInModalOpen)} />}
      {isProfileModalOpen && <ProfileModal onToggle={() => toggleModal(setIsProfileInModalOpen, isProfileModalOpen)} />}
    </header>
    
  )
}

export default Header