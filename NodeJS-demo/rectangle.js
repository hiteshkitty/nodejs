module.exports = (x,y, callback) =>{
    if(x <=0 || y <=0) {
        setTimeout(() => {
            callback(new Error("Invalid dimensions"),null )
        }, 2000);
        console.log("invalid dimensions"); 
    } else {
        setTimeout(() => {
            callback(null,{
                perimeter: () =>(2*(x+y)),
                area: () => (x*y)
            });
        }, 2000);
    }
}


