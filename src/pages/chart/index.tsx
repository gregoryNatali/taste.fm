import { Chart } from "@/components/Chart"
import { Album, Artist, Track } from "@/types/LastfmData"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ChartPageContainer } from "./styles"

export type ChartItemInfo = {
  mbid: string
  name: string
  playcount: string
}

type UserTopResult = {
  topartists?: {
    artist: Artist[]
  }
  topalbums?: {
    album: Album[]
  }
  toptracks?: {
    track: Track[]
  }
}

type ChartPageProps = {
  itemsList: ChartItemInfo[]
}

const ChartPage = ({ itemsList }: ChartPageProps) => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()


  const chartSize = router.query.chartSize

  if (!chartSize || typeof chartSize !== 'string') return

  console.log(itemsList)

  if (isLoading) return <p>Loading...</p>

  if (!data) return <p>Error</p>

  return (
    <ChartPageContainer>
      <Chart
        chartSize={chartSize}
        mbidList={itemsList}
      />
    </ChartPageContainer>
  )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiKey = process.env.LAST_FM_API_KEY
  const api = axios.create()

  const username = ctx.query.username
  const period = ctx.query.period
  const chartType = ctx.query.chartType

  const { data } = await api.get<UserTopResult>(`http://ws.audioscrobbler.com/2.0/?method=user.gettop${chartType}&user=${username}&period=${period}&api_key=${apiKey}&format=json`)

  let list: ChartItemInfo[] = []

  if (chartType === 'artists' && data.topartists) {
    data.topartists.artist.forEach(artist => {
      list.push({
        mbid: artist.mbid,
        name: artist.name,
        playcount: artist.playcount
      })
    })
  }

  if (chartType === 'albums' && data.topalbums) {
    data.topalbums.album.forEach(album => {
      list.push({
        mbid: album.mbid,
        name: album.name,
        playcount: album.playcount
      })
    })
  }

  if (chartType === 'tracks' && data.toptracks) {
    data.toptracks.track.forEach(track => {
      list.push({
        mbid: track.mbid,
        name: track.name,
        playcount: track.playcount
      })
    })
  }

  return {
    props: {
      itemsList: list
    }
  }

}

export default ChartPage