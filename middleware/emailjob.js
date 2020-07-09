emailjob= ((req,res,next)=>{
    console.log("Sending Email...");
    next();
});

module.exports = emailjob;