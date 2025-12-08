import React, { useState } from "react";
import {useAuth} from "../../context/UserContext";
import "./Modal.css";

const RegisterModal = () => {
    const { 
        isRegisterModalOpen, 
        closeRegisterModal, 
        register, 
        openLoginModal 
    } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    if (!isRegisterModalOpen) return null;

    const handleSumbit = (e) => {
        e.preventDefault();
        register(email, password, name);
    }

    return(
        <div className="modal-container">
            <div className="modal-header">
                <span className="modal-title">회원가입</span>
                <button className="close-button"onClick={closeRegisterModal}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleSumbit}>
                <input 
                    type="text" 
                    className="input-field" 
                    value={email} 
                    placeholder="이메일"
                    onChange = {(e)=>{setEmail(e.target.value)}}
                    required
                    />
                <input 
                    type="text" 
                    className="input-field" 
                    value={password} 
                    placeholder="비밀번호" 
                    onChange={(e)=>{setPassword(e.target.value)}}  
                    required
                    />
                <input 
                    type="text" 
                    className="input-field"
                    placeholder="이름" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />  
                <button type="submit" className="submit-button">가입하기</button>                  
            </form>
            <div className="modal-footer">
                이미 계정이 있으신가요? 
                <span className="switch-link" onClick={openLoginModal}>
                    로그인
                </span>
            </div>
        </div>
    )
}

export default RegisterModal;