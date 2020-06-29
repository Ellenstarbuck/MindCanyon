const mongoose = require ('mongoose')
const { dbURI } = require ('../config/environment')
const Blog = require('../models/blog')
const User = require('../models/user')


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          email: 'steve@email',
          password: 'pass',
        },
        {
          email: 'charlie@email',
          password: 'pass',
        },
      ])
    })
    .then(createdUsers => {
      return Blog.create([
        {
          date: 'Wed Jun 03 2020 14:41:02 GMT+0100 (British Summer Time)',
          title: '10 Isolation Improv Games',
          summary: 'Here are some warmups your can practice on your own.',
          image:  'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/8049/thumb_Improv-for-Success.jpg',
          body: '<h1>Solo Doors</h1><p>A\
          Solo exercise. Enter, as a character, through a door. Make the\
          environment clear (by means of the (kind of) door. In that\
          environment, address your character as a different character, then one\
          of the characters (you again) leaves (through the door, or through\
          another door/window/hole/whatever).\
          Do this fairly fast and long enough so you run through your easy\
          characters. You can shelve any interesting characters you discover of\
          course.</p>',
          user: createdUsers[0],
        },
      ])
    })
    .then(createdBlogs => console.log(`${createdBlogs.length} blogs created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
