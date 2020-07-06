console.log("1: Before calling Database");

function getMovieDataFromDb(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("2: Movie Data...");
            let dbData = {id: 30, name: "Avengers End Game"};
            resolve(dbData);
        }, 4000);
    })

}
async function printMovieDetails(){
    let movieDataFromDb = await getMovieDataFromDb();
        console.log("3: Reading Data from Db : "+movieDataFromDb);
}

printMovieDetails();

// getMovieDataFromDb().then((result)=> {
//     let movieDataFromDb = result;
//     console.log("3: Reading Data from Db : "+movieDataFromDb);
// })

console.log("4: Doing some other work now");
