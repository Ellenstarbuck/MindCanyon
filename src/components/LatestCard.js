import React from 'react'
import '../stylesheet.css'

const LatestCard = ({ title, season, episode, description, imageURL, audioURL, audioType }) => {
  return (
    <>
    <div className="leImage">
      <img className="iconImage" src={imageURL} />
    </div>

    <div className="leText">
      <div className="leNumber"> {season}  |  {episode} </div>
      <div className="leTitle"> {title} </div>
      <div className="leDescription"> {description}
      </div>
      <audio className="leAudio" controls>
        <source
          src={audioURL}
          type={audioType} />
                Your browser does not support the audio element.
    </audio>
    </div>
    </>
  )
}

export default LatestCard


