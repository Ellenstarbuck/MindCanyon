import React from 'react'
import '../stylesheet.css'

const EpisodeCard = ( {title, description, imageURL, audioURL, audioType} ) => {
  return (
    <div className="episodeItem">
      <div className="episodeTitle"> {title}</div>
      <img className="episodeImage" src={imageURL} />
      <div className="episodeDesc">
        {description}
      </div>
      <audio className="episodeAudio" controls>
        <source
          src={audioURL}
          type={audioType} />
                  Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default EpisodeCard


