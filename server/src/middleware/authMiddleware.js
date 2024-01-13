exports.isVerified = async (req, res, next) => {
    try{
        if (req.user.isVerified == false) {throw new Error('User Not Verified')}
        console.log('truly verified')
        next()
    }
    catch(e){
        console.log('not verified')
        next(e)
    }
    
}