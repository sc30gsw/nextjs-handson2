import Search from 'lib/components/Search'
import { getRandomPhotos } from 'lib/unsplash'

const Home = async () => {
  const randomPhotos = await getRandomPhotos()

  return (
    <div>
      <Search randomPhotos={randomPhotos} />
    </div>
  )
}

export default Home
