const CustomApiError = require("./customapierror");
const {StatusCodes}=require("http-status-codes")

class NotFoundError extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCodes=StatusCodes.NOT_FOUND
    }
}
module.exports=NotFoundError