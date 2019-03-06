// exports.createValiedator=function(req,res,next)
// {
// req.check('title','Write a Title').notEmpty();
// req.check('title','Title must be between 4 and 150 length').isLength({min: 4,max:150});
// };

// var errors=req.validationErrors();
// if(errors)
// {
//     var firstError=errors.map((error) => error.msg)[0];
//     return res.status(400).json({error: firstError});
// }
// next();
// };