import path from 'path';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { host, port, user, pass } from '../config/mail.json';

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
});

const handlebarOptions = {
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail'),
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
}

transport.use('compile', hbs(handlebarOptions));


export default transport;