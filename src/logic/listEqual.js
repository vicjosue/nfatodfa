/* 
Compare two list, if they have the same values return true regardless the order

Parameters:
    list1: array object
    list2: array object

Returns:
    True if have the same values, false if not
*/

export default function listEqual(list1, list2) {
    if(list1.length !== list2.length)
        return false;

    for (let i = 0; i < list1.length; i++) {
        if( list2.indexOf(list1[i]) < 0 )
              return false;
      }

    return true;
}