'use client'

import type { Photo, PhotoSearchResponse } from 'lib/type'
import type { FunctionComponent } from 'react'
import React, { useState, useTransition } from 'react'
import { VscSearch } from 'react-icons/vsc'

import Loading from './Loading'
import PhotoList from './PhotoList'

const PhotoListWrapper: FunctionComponent<{
  loading: boolean
  searchedPhotos: Photo[]
  randomPhotos: Photo[]
}> = ({ loading, searchedPhotos, randomPhotos }) => {
  if (loading) return <Loading />

  if (searchedPhotos.length > 0) return <PhotoList photos={searchedPhotos} />

  return <PhotoList photos={randomPhotos} />
}

const Search: FunctionComponent<{ randomPhotos: Photo[] }> = ({
  randomPhotos,
}) => {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchPhotos, setSearchPhotos] = useState<Photo[]>([])
  const [loading, startTransition] = useTransition()

  const handleClick = async () => {
    setSearching(true)

    const response = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    })

    const json: PhotoSearchResponse = await response.json()

    startTransition(() => {
      setSearchPhotos(json.results)
    })
    setSearching(false)
  }
  return (
    <div>
      <div className="my-8 flex justify-center">
        <input
          className="w-96 mr-4 p-2 bg-gray-700"
          value={query ?? ''}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-gray-700 py-2 px-4" onClick={handleClick}>
          <VscSearch />
        </button>
      </div>
      <PhotoListWrapper
        loading={searching || loading}
        searchedPhotos={searchPhotos}
        randomPhotos={randomPhotos}
      />
    </div>
  )
}

export default Search
