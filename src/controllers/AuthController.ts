
/*
index: listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma unica sessao
update: quando queremos alterar alguma sessao
destroy: quando queremos deletar uma sessao
*/
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import authConfig from '../../src/config/auth.json';
import mailer from '../../src/modules/mailer';
import * as Yup from 'yup';
import Mailer from '../modules/mailer';

import User from '../models/User';



function generationToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

class AuthController {

    async authenticate(req: Request, res: Response ){

       const schema = Yup.object().shape({
           email: Yup.string().email().required(),
           password: Yup.string().min(6, "Informe uma senha de 6 dígitos").max(10).required()
       })

        const { email, password } = req.body;

        if (!(await schema.isValid(req.body))){
            return res.status(400).send({ error: 'Email required' })
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' })

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        res.send({
            user,
            token: generationToken({ id: user.id })
        });
    }

    async store(req: Request, res: Response) {
        const { email } = req.body;
        console.log(req.body);
        try {
            if (await User.findOne({ email }))
                return res.status(400).send({
                    error: 'User already exists'
                })
            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generationToken({
                    id: user.id
                })
            });

        } catch (err) {
            return res.status(400).send({
                error: 'Registration failed'
            });

        }

    }

    async forgot_password(req: Request, res: Response) {

        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            // console do token e a hora atual
            // console.log(token, now);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            Mailer.sendMail({
                to: email,
                from: 'andersonribeiro.puc@gmail.com',
                subject: 'Recuperação senha',
                html: `<p>Ola, para recuperacão da sua senha, clique no link: ${token}</p>`
            }, (err) => {
                if (err)
                    return res.status(400).send({ error: 'Cannot send forgot password email' });

                return res.send({ success: true });
            })

        } catch (err) {
            return res.status(400).send({ error: 'Erro on forgot password, try again' });
        }

    }

    async reset_password(req: Request, res: Response) {

        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

            if (!user)
                return res.status(400).send({ error: 'User not found ' });
            if (token !== user.passwordResetToken)
                return res.status(400).send({ error: 'Token Invalid ' });

            const now = new Date();
            if (now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, generate a new one' });

            user.password = password;
            await user.save();
            res.send({ success: true });

        } catch (error) {
            res.status(400).send({ error: 'Cannot reset password, try again' });
        }

    }

}

export default new AuthController();