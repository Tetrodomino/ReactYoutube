import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query"
import { formatAgo } from "../util/date";
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import VideoCard from "../components/VideoCard";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SmallVideoCard from "./SmallVideoCard";
import { useRelatedVideo } from "../api/youtube";

export default function RelatedVideo({ id, name }) {
  const { isLoading, error, videos } = useRelatedVideo(id);

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {error && <p>Someting is wrong</p>}
      {videos &&
        (<Grid container spacing={1}>
          {videos.map(video => (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <SmallVideoCard key={video.id} video={video}/>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
    </div>
  )
}