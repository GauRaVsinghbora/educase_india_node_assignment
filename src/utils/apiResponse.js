class ApiResponse {
    constructor(statusCode,message = "Success", data ) {
        this.statusCode = statusCode<400 ? statusCode : 200;
        this.data = data;
        this.success = true;
        this.message = message;
    }}
    
export { ApiResponse as apiresponse };