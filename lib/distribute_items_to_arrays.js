/*
>>distributeItemsToArrays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [[], [], []])
<<[ [ 1, 2, 3, 11 ], [ 4, 5, 6, 10 ], [ 7, 8, 9 ] ]
*/

export default function distributeItemsToArrays(items, arrays) {
    let itemsForArray = Math.floor(items.length / arrays.length);
    let remainedItems = items.length % arrays.length;
    let offset = 0;

    let distributedArrays = arrays.map((array) => {
        array = items.slice(offset, itemsForArray + offset);
        offset = offset + itemsForArray;
        return array;
    });

    for (let array of distributedArrays) {
        array.push(items[offset + remainedItems - 1]);
        remainedItems--;
        if (remainedItems == 0) {
            break;
        }
    };

    return distributedArrays;
}
