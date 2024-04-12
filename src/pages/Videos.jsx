import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import VideoCard from "../components/VideoCard";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useVideo } from '../api/youtube';

// const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
// const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

export default function Videos() {
  const {keyword} = useParams();
  const {isLoading, error, videos} = useVideo(keyword);

  return (
    <>
      <div style={{margin: '20px'}}>
        <h1>
          Videos {keyword ? `${keyword}로 검색` : 'Hot Trend'}
        </h1>
      </div>
      {isLoading && <p>Loading</p>}
      {error && <p>Someting is wrong</p>}
      {videos &&
        (<Grid container spacing={1}>
          {videos.map(video => (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <VideoCard key={video.id} video={video}/>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}