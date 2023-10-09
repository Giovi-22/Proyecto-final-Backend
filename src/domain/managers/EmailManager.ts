import nodemailer from 'nodemailer';
import fs from 'fs/promises'
import Handlebars from 'handlebars';
import path from 'path';

import { config } from '../../config/index';
import { IUser } from '../entities/User/IUser';


class EmailManager{

    #transporter!:nodemailer.Transporter;
    constructor(){
        this.#init();
    }
    #init(){

        this.#transporter = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:'giovannibarolin@gmail.com',
                pass: config.emailKey
            }
        });
    }

    async send(to:string,subject:string,data:{user:IUser,jwt:string,url:string},templateHbs:string){
        try {
            const template = await this.#selectTemplate({...data},templateHbs);
            console.log("a quien va enviado: ",to)
            console.log("data: ",data)
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

    async #selectTemplate(data:{user:IUser,jwt:string,url:string},templateHbs:string){
        const templateDir = path.resolve('src/presentation/views/templates');
        const source = (await fs.readFile(`${templateDir}/${templateHbs}`)).toString();
        const template = Handlebars.compile(source);
        const html = template(data);
        return html;
    }
}

export default EmailManager;