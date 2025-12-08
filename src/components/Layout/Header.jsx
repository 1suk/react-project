import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; 
import './Header.css';
import { useAuth } from '../../context/UserContext';

const Header = () => {
    const {
        user,
        logout,
        openLoginModal,
        openRegisterModal
    } = useAuth();
    
    return (
        <>
        <header className="header-container">
            <div className="header-left">
                <span className="app-title">영화 리뷰</span>
            </div>

            <nav className="header-center glass-nav">
                <NavLink to="/" className="nav-item">홈</NavLink>
                <NavLink to="/myReviews" className="nav-item">내리뷰</NavLink>
                <NavLink to="/settings" className="nav-item">설정</NavLink>
            </nav>

            <div className="header-right">
                {user ? (
                    <>
                        <span className='user-info'>
                            {user.name}님 환영합니다!
                        </span>
                        <div className='logout-button' onClick={logout}>로그아웃</div>
                    </>
                ): (
                    <>
                    <div className="login-button" onClick={openLoginModal}>로그인</div>
                    <div className="register-button" onClick={openRegisterModal}>회원가입</div>
                    </>
                )}
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    );
};

export default Header;