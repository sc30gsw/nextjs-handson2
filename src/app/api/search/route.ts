import { searchPhoto } from 'lib/unsplash'

// ルートハンドラーとなる関数
export const POST = async (request: Request) => {
  const { query }: { query: unknown } = await request.json()

  if (!query || typeof query !== 'string') {
    const response = new Response('no query', {
      status: 4000,
    })
    return response
  }

  const searchPhotoResponse = await searchPhoto(query)

  return new Response(JSON.stringify(searchPhotoResponse), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
