type SortOrder = 'ASC' | 'DESC';

export const quickSort = (
  arr: Array<any>,
  sortKey: string,
  order: SortOrder,
) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const leftArr = [];
  const rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (order === 'DESC') {
      if (arr[i][sortKey] > pivot[sortKey]) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    } else if (order === 'ASC') {
      if (arr[i][sortKey] < pivot[sortKey]) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  }

  return [
    ...quickSort(leftArr, sortKey, order),
    pivot,
    ...quickSort(rightArr, sortKey, order),
  ];
};
