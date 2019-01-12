import findDuplicateCount from './findDuplicateCount'

it('Returns number of duplicates in one array', () => {
  expect(findDuplicateCount([['ball','box', 'ball', 'ball', 'box','x']])).toEqual(3);
});

it('Returns number of duplicates in many arrays', () => {
  expect(findDuplicateCount([['ball','box', 'ball', 'ball', 'box','x'], [2, 2, 2, 2, 2,5], [1, 2, 1, 1, 2,2]])).toEqual(3);
});