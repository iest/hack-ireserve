import Twitter from 'twitter';

// TODO move to
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
});

export const tweet = (msg) => new Promise((resolve, reject) => {
  client.post('statuses/update', {
    status: `@_iest ${msg}`
  }, function(error, tweet, response) {
    if (error) {
      return reject(error);
    }
    return resolve();
  });
})
