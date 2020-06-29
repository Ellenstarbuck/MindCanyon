import React from 'react'
import '../stylesheet.css'
// import DOMPurify from 'dompurify'

const LatestBlog = ( { _id, date, title, summary, image, body } ) => {
  console.log(image)
  return (
    <>
      <div className="news">
        <img src={image} />
        <h1 className="ql-align-center">{title}</h1>
        <h2 className="ql-align-center">{summary}</h2>
        
        <div dangerouslySetInnerHTML={{ __html: body }} />

        
      </div>
    </>
  )
}

export default LatestBlog


