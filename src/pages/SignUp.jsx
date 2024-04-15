import React, { useState } from "react";
import { loginWithGithub, logout, register } from '../api/firebase'

export default function SignUp() {
    const [userInfo, setUserInfo] = useState({email:'', password:''});
    const [user, setUser] = useState(null);

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value}) // 해당 태그 name 속성값을 통해 email이나 password의 값을 변경
    }

    const handleSubmit = e => {
        e.preventDefault();
        // 제출 시 유저 정보 등록
        register(userInfo).then(result => {
            setUser(result);
        })
    }

    const handleGithub = e => {
        loginWithGithub().then(setUser);
    }

    const handleLogout = e => {
        logout().then(setUser);
    }

    const handleUpload = e => {
        
    }

    return (
        <div style={{margin: '50px'}}>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={userInfo.email}
                onChange={handleChange} />
                <br />
                <input type="password" name="password" value={userInfo.password}
                onChange={handleChange} />
                <br />
                <input type="text" name="name" value={userInfo.name}
                onChange={handleChange} />
                <br />
                <input type="file" accept="image/*" name="file" onChange={handleUpload} />
                <br />
                <button onClick={handleSubmit}>사용자 등록</button>
                <button onClick={handleLogout}>로그아웃</button>
            </form>
            <button onClick={handleGithub}>깃허브 로그인</button>
            <br />
            {user && (
                <>
                    <p>accessToken={user.accessToken}</p>
                    <p>email={user.email}</p>
                    <p>uid={user.uid}</p>
                </>
            )}
            {user && user.displayName && <p>displayName={user.displayName}</p>}
            {user && user.photoURL && <p>photoURL={user.photoURL}</p>}
        </div>
    )
}