class GenericResponse {
  message;
  data;

  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
}

module.exports = GenericResponse;
