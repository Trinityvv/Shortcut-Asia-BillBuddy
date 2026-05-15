export async function getFoodImage(query: string) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}+food&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      },
    }
  )

  const data = await response.json()

  return data.results?.[0]?.urls?.regular
}