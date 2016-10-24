import Twitter from 'twitter';

// TODO move to
const client = new Twitter({
  consumer_key: process.env.KEY,
  consumer_secret: process.env.SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
});

export const tweet = (msg) => {
  client.post('statuses/update', {
    status: 'I am a tweet'
  }, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });
}
