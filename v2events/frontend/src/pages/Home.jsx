import React from 'react'
import Play from '../components/Play'
import CircularRotatingShowcase from '../components/CircularRotatingShowcase'
import Timeline from '../components/Timeline'
import Guestbook from '../components/Guestbook'
import {HeartSeparator, DiamondSeparator,} from '../components/Separator'

const Home = () => {

  return (
    <div>
      <CircularRotatingShowcase/>
      <HeartSeparator />
      <Play/>
      <DiamondSeparator/>
      <Timeline />
      <HeartSeparator />
      <Guestbook />
    </div>
  )
}

export default Home
