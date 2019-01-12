import {findDuplicateCountArray, findDuplicateCountObjects} from './findDuplicateCount'

it('Returns number of duplicates in one array', () => {
  expect(findDuplicateCountArray(['ball','box', 'ball', 'ball', 'box','x'])).toEqual(3);
});

it('Returns number of duplicates in many objects', () => {
  const obj = {
    "product-1" : {
      "name": "ball",
      "price": "10"
    },
    "product-2" : {
      "name": "ball",
      "price": "12"
    },
    "product-3" : {
      "name": "ball",
      "price": "12"
    }
  }
  const [duplicatValues, count] = findDuplicateCountObjects(obj);
  expect(count).toEqual(1);
});