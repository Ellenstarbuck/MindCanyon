import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/stylesheet.css'
import csImage from '../images/charlieandsteve.jpg'
import EpisodeCard from '../src/components/EpisodeCard'
import LatestCard from '../src/components/LatestCard'
import LatestBlog from '../src/components/LatestBlog'
import axios from 'axios'


const parseRSS = (array) => {
  const result = []
  array.map(element => {
    const epStore = {}
    epStore.id = element.split('<guid isPermaLink="false">')[1].split('</guid>')[0]
    epStore.title = element.split('<title><![CDATA[')[1].split(']]></title>')[0]
    epStore.description = element.split('<description><![CDATA[')[1].split(']]></description>')[0].replace(/(<([^>]+)>)/ig, '').replace('&nbsp;', '')
    epStore.imageURL = element.split('<itunes:image href="')[1].split('"/>')[0]
    if (element.includes('<itunes:episode>')) {
      epStore.episode = 'Episode ' + element.split('<itunes:episode>')[1].split('</itunes:episode>')[0]
    } else {
      epStore.episode = 'Bonus Episode'
    }
    if (element.includes('<itunes:season>')) {
      epStore.season = 'Season ' + element.split('<itunes:season>')[1].split('</itunes:season>')[0]
    } else {
      epStore.season = ''
    }
    const audioDetails = element.split('<enclosure')[1].split('/>')[0]
    epStore.audioURL = audioDetails.split('url="')[1].split('" length')[0]
    epStore.audioType = audioDetails.split('type="')[1].split('"')[0]
    result.push(epStore)
  }
  )

  return result
}




const App = () => {

  const [episodes, setEpisodes] = useState(null)
  const [blogs, setBlogs] = useState(null)


  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get('https://anchor.fm/s/81210e4/podcast/rss')
        const itemArray = res.data.split('<item>')
        itemArray.shift()
        setEpisodes(parseRSS(itemArray))
      } catch (err) {
        console.log(err)
      }
    }
    fetchEpisodes()
  }, [])
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('api/blogs')
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBlogs()
  }, [])





  if (!episodes) return null
  if (!blogs) return null
  


  return (
    <>
      <hr />
      <div className="navBar">
        <div className="navOptions">
          <div className="headline1">Mind Canyon</div>
          <div className="navItem">ABOUT</div>
          <div className="navItem">CAST</div>
          <div className="navItem">LISTEN</div>
        </div>
      </div>
      <hr />

      <div className="bodyOuterFrame">
        <div className="bodyInnerFrame">
          <div className="headline2">Latest Episode</div>
          <div className="bubble">

            {episodes.slice(0, 1).map(episode => <LatestCard key={episode.id} {...episode} />)}

          </div>
          <div className="headline2">About</div>
          <div className="bubble">
            <div className="about">
              <img className="aboutImage" src={csImage} />
              <div className="aboutText">
                Mind Canyon is a mockumentary podcast starring the best UK improvisers. Nominated for Best Comedy and the Creativity Award at the British Podcast Awards 2020. Join hosts Steve Dawson (Mitchell & Webb, The Peter Serafinowicz Show) and Charlie Kemp (Man Down, Emmerdale) as they fill your Mind Canyon™. This ‘Radiolab’ style podcast explores stories such as “Finding The World Hide and Seek Champion”, “The Most Haunted Londis” and “When Space Pranks Go Wrong”. The show is improvised then edited and soundscaped for your listening pleasure.
              </div>
            </div>
          </div>
          <div className="headline2">Episodes</div>
          <div className="episodes">
            {episodes.slice(1, 4).map(episode => <EpisodeCard key={episode.id} {...episode} />)}
          </div>

          <div className="headline2">News</div>
          <div className="bubble">

            {blogs.map(blog => <LatestBlog key={blog._id} {...blog} />)}
           
          </div>
        </div>
      </div>
    </>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root'))
