import React from "react";
import { useLocation } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideo from "../components/RelatedVideo";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function VideoDetail() {
  const { state: {video} } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <Grid container spacing={2} sx={{marginTop: '10px'}}>
      <Grid item xs={12} sm={12} lg={8} md={8} >
        <div>
          <Box sx={{paddingTop: '53%', height: 0, width: '100%', position: 'relative'}}>
            <iframe id='player' type='text/html' width={'100%'} height={'100%'}
              style={{position: 'absolute', top: 0, left: 0}} title={title}
              src={`https://www.youtube.com/embed/${video.id}`} />
          </Box>
          <div>
            <h3>{title}</h3>
            <ChannelInfo id={channelId} name={channelTitle} />
            <pre style={{whiteSpace: "pre-wrap"}}>{description}</pre>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} lg={4} md={4}>
        <RelatedVideo  id={channelId} name={channelTitle} />
      </Grid>
    </Grid>
  )
}