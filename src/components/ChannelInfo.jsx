import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { formatAgo } from "../util/date";
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';

export default function ChannelInfo({id, name}) {
  const {data: url} = useQuery({
    queryKey: ['channel', id],
    queryFn: async () => {
      return axios.get('/data/channels.json')
            .then(res => res.data.items[0].snippet.thumbnails.default.url)
    },
    staleTime: 1000 * 60 * 5
  });
  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={2}>
      {url && <img src={url} alt={name} style={{width: '50px'}} />}
      <h4>
        {name}
      </h4>
    </Stack>
  )
}