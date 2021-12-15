import jwt from 'jsonwebtoken'

const createToken = (payload) => {
    return jwt.sign(payload, 'secret', {
        expiresIn: '3h'
    });
}

export {createToken}