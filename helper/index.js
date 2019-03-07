//express-validator package is used  for applying validations to 

exports.createValiedator=function(req,res,next)
{
    ///to check title is not empty
req.check('title','Title is important').notEmpty();
//to check title is not short
req.check('title','Title must be between 4 and 150 length').isLength({min: 4,max:150});

///to check title is not empty
    req.check('category','category is important').notEmpty();
    //to check title is not short
    req.check('category','category must be between 4 and 150 length').isLength({min: 4,max:150});

// check fr error ..we get requst validations error
//first one apppears as they emerge
var errors=req.validationErrors();
if(errors)
{
    //first error captured
    var firstError=errors.map((error) => error.msg)[0];
    //captures all the errors and send it in json format
    //var firstError=errors.map((error) => error.msg);
    return res.status(400).json({error: firstError});
}
next();
};