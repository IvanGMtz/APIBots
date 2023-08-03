import rateLimit from "express-rate-limit";

export let limitGet=()=>{
    return rateLimit({
        windowMs: 30 * 1000, // 15 minutes
        max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        skip: (req, res)=>{
            if (req.headers["content-length"]>89) {
                res.status(413).send({
                    status: 413,
                    message: "El tamaño es incorrecto"
                  });
                return true;
            }
        },
        message:{status:429, message: "Pailas papá, no puede >:( "}
    })
}