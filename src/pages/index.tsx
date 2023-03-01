import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { HomeContainer, InputsContainer } from './index.styles'
import { useRef } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const periodSelectRef = useRef<HTMLSelectElement>(null)
  const chartTypeSelectRef = useRef<HTMLSelectElement>(null)
  const chartSizeSelectRef = useRef<HTMLSelectElement>(null)

  function redirectToChartPage() {
    const username = usernameInputRef.current?.value
    const period = periodSelectRef.current?.value
    const chartType = chartTypeSelectRef.current?.value
    const chartSize = chartSizeSelectRef.current?.value
    router.push({
      pathname: '/chart',
      query: {
        username,
        period,
        chartType,
        chartSize
      }
    }, '/chart')
  }

  return (
    <HomeContainer>
      <h1>taste.fm</h1>

      <InputsContainer>
        <div>
          <label htmlFor='usernameInput'>Username:</label>
          <input ref={usernameInputRef} name='usernameInput' type="text" />
        </div>

        <div>
          <label htmlFor="periodSelect">Period:</label>
          <select ref={periodSelectRef} name="periodSelect">
            <option value="overall">overall</option>
            <option value="7day">7 days</option>
            <option value="1month">1 month</option>
            <option value="6month">6 month</option>
            <option value="12month">12 month</option>
          </select>
        </div>

        <div>
          <label htmlFor="chartTypeSelect">Chart Type:</label>
          <select ref={chartTypeSelectRef} name="chartTypeSelect" >
            <option value="tracks">tracks</option>
            <option value="artists">artists</option>
            <option value="albums">albums</option>
          </select>
        </div>

        <div>
          <label htmlFor="chartSizeSelect">Chart Size:</label>
          <select ref={chartSizeSelectRef} name="chartSizeSelect">
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={7}>7x7</option>
          </select>
        </div>

        <button onClick={redirectToChartPage}>Generate Chart</button>
      </InputsContainer>
    </HomeContainer>
  )
}
