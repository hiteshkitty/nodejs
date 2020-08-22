var rect = require('./rectangle');

function solveRec(l, b) {
    console.log("solving for rect with l: " + l + " b: " + b);

   rect(l, b, (err, rectangle) => {
    if(err) {
        console.log("ERROR: " + err.message);
    } else {
        console.log("area: " + rectangle.area());
        console.log("perimeter: " + rectangle.perimeter());
    }

   });
}


solveRec(2, 4);

solveRec(0, 4);

solveRec(8, 10);
