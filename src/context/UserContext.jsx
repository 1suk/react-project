import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export const AuthProvider = ({children}) => {
    //localStorage에서 로그인된 유저 불러오기
    const [user, setUser] = useState(() =>{
        const savedUser = localStorage.getItem('user');
        //console.log("저장된 유저 :",savedUser); 
        return savedUser ? JSON.parse(savedUser) : null;
    })

    useEffect(() => {
        if(user){
            localStorage.setItem('user', JSON.stringify(user))
        }else{
            localStorage.removeItem('user')
        }
    },[user]);

    const [users, setUsers] = useState(()=> {
        const savedUserList = localStorage.getItem('users');
        console.log("저장된 유저 목록 :", savedUserList);
        return savedUserList ? JSON.parse(savedUserList) : [];
    })

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    }

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    const openRegisterModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    }; 

    const register = (email, password, name) => {
        const newUser = {
            id : Date.now(),
            email,
            password,
            name,
            createAt : new Date().toISOString()
        };

        setUsers(prev => [...prev, newUser]);
        console.log("새로운 User : ", newUser);

        closeRegisterModal();

        return {user : newUser};
    }

    const login = (email, password) => {
        const found = users.find(
            u => u.email == email && u.password == password
        )

        if(!found){
            alert("이메일 또는 비밀번호가 틀렸습니다.");
            return {error : "로그인 실패"}
        }

        setUser(found);

        closeLoginModal();
        
        return {user : found};
    }

    const logout = () => {
        setUser(null);
    }

    const value = {
        user, 
        users,
        register,
        login,
        logout,
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal
    };
    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
    
}
