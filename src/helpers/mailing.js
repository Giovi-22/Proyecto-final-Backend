import nodemailer from 'nodemailer';
import { config } from '../config';



class Email{

    constructor(){
        this.transport = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:'giovannibarolin@gmail.com',
                pass: config.emailKey
            }
        })
    }

    async sendMail(to){
        let mail = await this.transport.sendMail(
            {
                from:"giovannibarolin@gmail.com",
                to:to,
                subject:"correo de prueba",
                html:`<div>
                <h1>Correo de prueba<h1>
                </div>`
            }
        )
        return mail;
    }
}

export default Email;
