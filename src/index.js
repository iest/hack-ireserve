import request from 'superagent';
import R from 'ramda';

const { skus } = require('../product.json');
const { stores } = require('../stores.json');

const URL = 'https://reserve.cdn-apple.com/GB/en_GB/reserve/iPhone/availability.json';
const NONE = "NONE";
const SPEC = 'iPhone 7 Plus 128GB Jet Black';
const SKU = R.compose(
  R.prop('part_number'),
  R.find(R.propEq('productDescription', SPEC))
)(skus);

const ldn = R.filter(R.propEq('storeCity', 'London'))(stores);
const ldnNums = R.map(R.prop('storeNumber'));
const ldnNames = R.map(R.prop('storeName'));
const storeHash = R.zipObj(ldnNums(ldn), ldnNames(ldn));

const availability = R.compose(
  R.map(k => storeHash[k]),
  R.filter(k => storeHash[k]),
  R.keys,
  R.filter(R.propSatisfies(a => a !== NONE, SKU)),
)

async function check() {
  const {body} = await request.get(URL)

  const availableAtStores = availability(body);

  if (availableAtStores.length) {
    console.log(`Available at: ${availableAtStores.join(', ')}`);
  } else {
    console.log('No availability currently.');
  }
}

const sleep = (s = 1) => new Promise(resolve => setTimeout(resolve, s * 1000))

async function main() {
  await check()
  await sleep(5)
  main()
}

main()
