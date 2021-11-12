import React from 'react'
import Tweet from './Tweet.js'

// let imagen = "https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"

// const Timeline = ({ tweets }) => tweets && <Tweet tweets={ tweets } key={ tweets[0].id } tweet={{...tweets[0], images:[imagen, imagen, imagen, imagen], reply:{...tweets[1], images:[imagen, imagen, imagen, imagen], reply:undefined, likes:undefined}}}/>

const Timeline = ({ tweets }) => tweets.map((tweet) => <Tweet key={ tweet.id } tweet={ tweet } />)

export default Timeline
