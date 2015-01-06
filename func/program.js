

function upperCaser(input)
{
	
	return input.toUpperCase();
}
module.exports.upperCaser = upperCaser;


function repeat(func,num)
{
	if(num <= 0) return
	func();
	return repeat(func,--num);
}

module.exports.repeat = repeat;

// Map constructs a new Array from each value in old array.
function doubleAll(numbers)
{
	return numbers.map(function(num){
		return num * 2;
	});

}

module.exports.doubleAll = doubleAll


function getShortMessages(messages){
	return messages.filter(function(data){
		return data.message.length < 50;
	}).map(function(msg){
		return msg.message;
	});
	
}

module.exports.getShortMessages = getShortMessages



function checkUsersValid(goodUsers){
	return function(submittedUsers){
		return submittedUsers.every(function(e1){
			return goodUsers.some(function(e2){
				return e1.id == e2.id;	
			});
		})
	}
}

module.exports.checkUsersValid = checkUsersValid

// Previous in a reduce call returns w/e is returned.
// Here we add to the list and bring it over again and again.
function countWords(inputWords)
{
	return inputWords.reduce(function(list,word){
		list[word] = ++list[word] || 1;
		return list;
	},{});
}

module.exports.countWords = countWords


function reduce(arr,fn,initial){ 
	return (function reduceOnce(val,index)
	{

		if(index > arr.length - 1)
			return val;
		return reduceOnce(fn(initial,arr[index],index,arr),index+1);
	})(initial,0);
}

module.exports.reduce = reduce


function duckCount()
{
	
}























