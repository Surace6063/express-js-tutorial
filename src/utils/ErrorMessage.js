export const ErrorMessage = (message,statusCode) => {
    const error = new Error(message)
    error.statusCode = statusCode

    return error
}