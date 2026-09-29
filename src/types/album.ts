type Album = {
    id: number;
    albumTitle: string;
    artist: string;
    releaseDate: string;
}

type MusicAnswer = {
  answer: string;
  albumTitle: string;
  releaseDate: string;
  trackList: string[];
}

type GptResponse0 = {
  status: string;
  answer?: MusicAnswer;
  steps: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}