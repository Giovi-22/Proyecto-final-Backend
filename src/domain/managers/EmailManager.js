import nodemailer from 'nodemailer';
import fs from 'fs/promises'
import Handlebars from 'handlebars';
import path from 'path';

import { config } from '../../config/index.js';





class EmailManager{

    #smtpConfig;
    #transporter;
    constructor(){
        this.#init();
    }
    #init(){
        this.#smtpConfig={
            service:'gmail',
            port:587,
            auth:{
                user:'giovannibarolin@gmail.com',
                pass: config.emailKey
            }
        }
        this.#transporter = nodemailer.createTransport(this.#smtpConfig);
    }

    async send(to,subject,data,templateHbs){
        try {
            const template = await this.#selectTemplate({...data},templateHbs);
            let email = await this.#transporter.sendMail(
            {
                from:"giovannibarolin@gmail.com",
                to:to,
                subject:subject,
                html:template
            }
        )
        return email;
            
        } catch (error) {
            return new Error(`error al enviar el email: ${error}`)
        }
        
    }

    async #selectTemplate(data,templateHbs){
        const templateDir = path.resolve('src/presentation/views/templates');
        const source = (await fs.readFile(`${templateDir}/${templateHbs}`)).toString();
        const template = Handlebars.compile(source);
        const html = template(data);
        return html;
    }
}

export default EmailManager;