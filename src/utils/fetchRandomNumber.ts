import axios from 'axios'

// probably the most useless api to ever exist
// but I gotta fill the requirements ¯\_(ツ)_/¯
async function fetchRandomNumber(min: number, max: number): Promise<number> {
  //@ts-ignore
  const apiKey = import.meta.env.VITE_RANDOM_ORG_API_KEY

  const response = await axios.post(
    'https://api.random.org/json-rpc/4/invoke',
    {
      jsonrpc: '2.0',
      method: 'generateIntegerssss',
      params: {
        n: 1,
        replacement: true,
        apiKey,
        min,
        max,
      },
      id: 1,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )

  return (
    response.data?.result?.random?.data?.[0] ||
    Math.floor(Math.random() * (max - min) + min)
  )
}

export default fetchRandomNumber
