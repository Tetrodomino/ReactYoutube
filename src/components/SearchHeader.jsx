import React, { useEffect, useState } from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

export default function SearchHeader() {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/videos/${text}`);
    }
    useEffect (() => {
        setText(keyword || '');
    }, [keyword]) // 키워드가 바뀌면
    const { user, logout} = useAuthContext();

    return (
        <Box
            p={2}
            sx={{ border: '2px solid grey' }}
        >
            <Grid container>
                <Grid item xs={8}>
                    <Stack direction={'row'} sx={{alignItems: 'center'}}>
                        <div style={{marginLeft: 10, marginRight: 10}}>
                            <Link to='/' style={{ textDecoration: "none", color: "black"}}>
                                <Stack direction={'row'} spacing={2}>
                                    <YouTubeIcon color="error" fontSize="large" />
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant="h5" sx={{fontweight: 'bold'}}>Youtube</Typography>
                                    </div>
                                </Stack>
                            </Link>
                        </div>
                        <Paper
                        component="form" onClick={handleSubmit}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '15px' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="검색"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            {/* <TextField 
                            id="outlined-basic" label="Outlined" variant="outlined"
                            sx={{ ml: 1, flex: 1 }}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            /> */}
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
                        {user && (
                            <Link to='/videos/record'>시청기록</Link>
                        )}
                        {user && user.photoURL && (
                            <img src={user.photoURL} alt={user.displayName} height={'32'} style={{borderRadius: 100}}/>
                        )}
                        {user && <p>{user.displayName}</p>}
                        {user && <button onClick={logout}>로그아웃</button>}
                        {!user && <Link to='/signUp'>로그인</Link>}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}