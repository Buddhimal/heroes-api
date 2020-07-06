let p=new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("2: Movie Data...");
        // return {id: 30, name: "Avengers End Game"}
        // resolve("Success");
        reject("reject");
    }, 3000);
});

p.then(function (result) {
    console.log(result);
}).catch(function (result) {
    console.log(result);
});