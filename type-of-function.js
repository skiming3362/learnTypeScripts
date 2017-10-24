function sum(x, y) {
    return x + y;
}
var mySum = function (x, y) {
    return x + y;
};
sum(1);
sum(1, 2, 3);
mySum(1, 2);
var mySearch;
mySearch = function (source, subString) { return source.search(subString) !== -1; };
function buildName(firstName, lastName) {
    if (lastName)
        return firstName + lastName;
    return firstName;
}
