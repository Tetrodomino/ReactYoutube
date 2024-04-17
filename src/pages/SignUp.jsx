import React, { useState } from "react";
import { login, loginWithGithub, logout, register } from '../api/firebase'
import { uploadImage } from "../api/cloudinary";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [userInfo, setUserInfo] = useState({email:'', password:'', name: '', photo:''});
    const [file, setFile] = useState();
    const navigate = useNavigate();

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value}) // 해당 태그 name 속성값을 통해 email이나 password의 값을 변경
    }

    const handleSubmit = e => {
        e.preventDefault();
        // 제출 시 유저 정보 등록

        register(userInfo)
        navigate('/signIn');
    }

    const handleGithub = e => {
        loginWithGithub();
        navigate(-1); // 뒤로가기
    }

    const handleUpload = e => {
        setFile(e.target.files[0]);
        uploadImage(e.target.files[0]).then(url => setUserInfo({...userInfo, ['photo']: url}))
    }

    return (
        <div style={{margin: '50px'}}>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={userInfo.email}
                onChange={handleChange} required/>
                <br />
                <input type="password" name="password" value={userInfo.password}
                onChange={handleChange} required/>
                <br />
                <input type="text" name="name" value={userInfo.name}
                onChange={handleChange} required/>
                <br />
                <input type="file" accept="image/*" name="file" onChange={handleUpload} required/>
                <br />
                <button onClick={handleSubmit}>사용자 등록</button>
            </form><br />
            <span>계정이 있을 경우 </span>
            <Link to='/signIn'>로그인</Link><br />
            <button onClick={handleGithub}>깃허브 로그인</button>
            {file && (<img src={URL.createObjectURL(file)} alt='photo' />)}
        </div>
    )
}