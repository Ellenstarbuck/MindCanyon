import React from 'react'
import '../stylesheet.css'
// import DOMPurify from 'dompurify'

const BlogCard = ( { _id, date, title, summary, image, body } ) => {
  console.log(image)
  const formatDate = new Date(date)
  return (
    <>
      <div className="news">
        <div className="blog">
          <div className="blogMain">
            <div className="blogTitleBody">
              <div className="blogTitle">{title}</div>
              <div className="blogSummary">{summary}</div>
            </div>
            <div className="blogArea">
              <img className="blogImage" src={image} />
              {/* <div className="blogDate">{formatDate.toLocaleDateString()}</div> */}
              <div className="blogBody" dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogCard


