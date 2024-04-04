const array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
const updatedarray=array.map(arr=>{
    if(arr===' '){
        return 'empty string';

    }
    else 
    {
        return arr;
    }
})

console.log(updatedarray);

hobbies=['study','sing'];
hobbies.push('sports');
console.log(hobbies);