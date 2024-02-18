class ApiResponse {
    constructor(status, data, message) {
      this.status = status;
      this.data = data;
      this.message = message;
    }
  
    static success(data, message = "Request berhasil") {
      return new ApiResponse("success", data, message);
    }
  
    static error(message = "Terjadi kesalahan", status = "error") {
      return new ApiResponse(status, null, message);
    }
  }
  
  module.exports = ApiResponse;
  