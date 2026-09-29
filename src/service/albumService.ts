import type {Album, GptReponse} from "@/types/album"

type Qa = {
    question: string;
    answer: string;
    tokens: number;
}



export async function searchAlbums(artist: string): Promise<GptReponse> {
  const response = await fetch(
    `/api/agent/run?artist=${encodeURIComponent(artist)}`
  );

  if (!response.ok) {
    throw new Error("Unable to search albums");
  }

  const data: GptReponse = await response.json();

  return data.map((answer) => ({
    //id: answer.collectionId,
    question: artist,
    answer: resultAnswer = `Artist: ${question} >> Album: ${answer.answer!.albumTitle}, ${answer.answer!.answer} tracks: ${answer.answer!.trackList.join(', ')} `,
    releaseDate: answer.answer!.releaseDate,
  }));
}