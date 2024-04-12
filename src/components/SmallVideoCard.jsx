import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
    return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <div style={{display: "flex", flexDirection: "row", marginTop: '8px'}}>
      <img src={thumbnails.medium.url} alt={title} width={'100%'} style={{maxWidth: 120, marginRight: '10px'}} onClick={() => {
      navigate(`/videos/watch/${videoId}`, {state: {video:video}})
      }}/>
      <div style={{width: '100%'}}>
        <Typography mt={1} onClick={() => {
        navigate(`/videos/watch/${videoId}`, {state: {video:video}})
        }} sx={{fontSize: '13px'}}>{title}</Typography>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: '5px'}}>
          <Typography sx={{fontSize: '11px'}}>{channelTitle}</Typography>
          <Typography sx={{fontSize: '11px'}}>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </div>
    </div>
  )
}