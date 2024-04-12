import React from "react";
import Stack from '@mui/material/Stack';
import { useChannelInfo } from "../api/youtube";

export default function ChannelInfo({id, name}) {
  const { url } = useChannelInfo(id);

  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={2}>
      {url && <img src={url} alt={name} style={{width: '50px'}} />}
      <h4>
        {name}
      </h4>
    </Stack>
  )
}