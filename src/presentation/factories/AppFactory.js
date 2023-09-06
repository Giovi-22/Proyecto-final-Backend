import ExpressApp from '../application/ExpressApp.js'
class AppFactory{

    static create(appType='express'){
        try {
            const apps = new Map();
            apps.set(appType,ExpressApp);
            const app = apps.get(appType);
            return new app();

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default AppFactory;