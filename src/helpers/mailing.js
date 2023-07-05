import fs from 'fs/promises';

import nodemailer from 'nodemailer';
import { config } from '../config/index.js';
import path from 'path';



class Email{
    #transport;
    constructor(){
        this.#transport = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:'giovannibarolin@gmail.com',
                pass: config.emailKey
            }
        })
    }

    async sendMail(to,templateHtml,subject="Tu compra en el sitio web e-commerce app"){
       let mail = await this.#transport.sendMail(
            {
                from:"giovannibarolin@gmail.com",
                to:to,
                subject:subject,
                html: templateHtml
            }
        )
        return mail;
    }

}

export default Email;
