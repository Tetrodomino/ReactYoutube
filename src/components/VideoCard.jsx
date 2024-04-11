import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
    return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <div onClick={() => {
      navigate(`/videos/watch/${videoId}`)
    }}>
      <img src={thumbnails.medium.url} alt={title} width={'100%'} style={{maxWidth: 320}}/>
      <div>
        <p>{title}</p>
        <p>{channelTitle}</p>
        <p>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </div>
  )
}