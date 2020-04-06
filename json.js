var person = {name: "Lydia"};
let members = person;
person = null;
console.log(members);


// for (var i = 0; i < 10; i++) {
//     console.log("---1: ", i);
//     setTimeout(function () {
//      console.log('1The number is1 ' + i);
//      console.log("---1----: ", i);//function scope
//     });
//    }
//    for (var i = 0; i < 10; i++) {
//        console.log("----2: ", i);
//     (function (i) {
//         console.log("----3: ", i)
//      setTimeout(function () {
//       console.log('2The number is ' + i);//function scope
//      });
//     })(i);
//    }
   
//    for (let i = 0; i < 11; i++) {
//     setTimeout(function () {
//      console.log('3The number is ' + i);// block scope
//     });
//    }