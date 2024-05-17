export  function SendMessage(text: any, error = true) {
    return {message: String(text), hasError: error}
}