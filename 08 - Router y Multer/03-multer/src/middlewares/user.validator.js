//! SOLICITUD  ---> MIDDLEWARE --->ENDPOINT

export const userValidator = (req, res, next) => {
    const user = {...req.body}
    if (user.code === 'RodrigoAutoriza') next();
    else res.status(403).json({msg: "No autorizado"});

};