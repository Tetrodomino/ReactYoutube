import {useQuery} from '@tanstack/react-query'
import axios from 'axios';

export const useVideo = keyword => {
    const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
    const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

    const { isLoading, error, videos } = useQuery({
        queryKey: ['videos', keyword],
        queryFn: async () => {
            const uri = keyword ? keywordUri + keyword : popularUri;
            return axios
            //.get(`/data/${keyword ? 'search' : 'popular'}.json`)
            .get(uri)
            .then(res => res.data.items);
        },
        staleTime: 1000 * 60 * 1 // 1분, ms 단위로 지정할 수 있음
    });

    return { isLoading, error, videos };
}

export const useChannelInfo = id => {
    const uri = `https://youtube.googleapis.com/youtube/v3/channel?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=statistics`
    const {data: url} = useQuery({
        queryKey: ['channel', id],
        queryFn: async () => {
          return axios.get(uri)
                .then(res => res.data.items[0].snippet.thumbnails.default.url)
        },
        staleTime: 1000 * 60 * 5
    });
    return {url};
}

export const useRelatedVideo = channelId => {
    const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channelId}`;

    const { isLoading, error, videos } = useQuery({
        queryKey: ['relatedVideos', channelId],
        queryFn: async () => {
          return axios
            .get(uri)
            .then(res => res.data.items);
        },
        staleTime: 1000 * 60 * 1 // 1분, ms 단위로 지정할 수 있음
    });
    return { isLoading, error, videos }
}