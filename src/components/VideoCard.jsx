import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  // if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
  //   return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <div>
      <img src={thumbnails.medium.url} alt={title} width={'100%'} style={{maxWidth: 320}} onClick={() => {
      navigate(`/videos/watch/${videoId}`, {state: {video:video}})
      }}/>
      <div>
        <Typography mt={2} onClick={() => {
        navigate(`/videos/watch/${videoId}`, {state: {video:video}})
        }} sx={{fontSize: '14px', fontWeight: 'bold'}}>{title}</Typography>
        <Divider sx={{marginTop: '8px'}} />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: '8px'}}>
          <Typography sx={{fontSize: '12px'}}>{channelTitle}</Typography>
          <Typography sx={{fontSize: '12px'}}>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </div>
    </div>
  )
}