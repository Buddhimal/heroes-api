log= ((req,res,next)=>{
    console.log("Authenticating user...");
    next();
});

module.exports = log;