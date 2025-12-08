import React from "react";
import {useAuth} from "../../context/UserContext"
import { useState } from "react";
import "./Modal.css";

const LoginModal = () => {
    const {
        isLoginModalOpen,
        closeLoginModal,
        login,
        openRegisterModal
    } = useAuth();    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if(!isLoginModalOpen){
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email,password);
    } 


    return(
        <div className="modal-container">
            <div className="modal-header">
                <span className="modal-title">로그인</span>
                <button className="close-button" onClick={closeLoginModal}>&times;</button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="input-field"
                    placeholder="이메일" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                <input 
                    type="password" 
                    className="input-field"
                    placeholder="비밀번호" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                <button type="submit" className="submit-button">로그인</button>
                </form>

                <div className="modal-footer">
                    계정이 없으신가요? 
                    <span className="switch-link" onClick={openRegisterModal}>
                        회원가입
                    </span>
                </div>
        </div>
    )
}

export default LoginModal;