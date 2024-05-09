export interface SongSearchResponse {
  id: string;
  title: string;
  author: string;
  channelId: string;
  image: string;
}

export interface YTVideoSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeSearchResult[];
}

export interface YoutubeSearchResult {
  kind: string;
  etag: string;
  id: YoutubeVideoId;
  snippet: YoutubeVideoSnippet;
}

interface YoutubeVideoId {
  kind: string;
  videoId: string;
}

interface YoutubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface YoutubeThumbnails {
  default: YoutubeThumbnail;
  medium: YoutubeThumbnail;
  high: YoutubeThumbnail;
}

interface YoutubeThumbnail {
  url: string;
  width: number;
  height: number;
}
