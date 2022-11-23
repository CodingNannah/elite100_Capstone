// overwrite the default Express error handler w functions that execute during req/res cycle 
// next calls additional errorWare
// res.json() --> return errors NOT as html
// stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    // --> additional error msgs while in dev mode

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}