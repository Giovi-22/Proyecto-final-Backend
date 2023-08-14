import ExpressApp from "../application/ExpressApp";

class AppFactory{

    static create(appType='express'){
        try {
            const apps = new Map();
            apps.set(appType,ExpressApp);
            const app = apps.get(appType);
            return new app();

        } catch (error:Error | any) {
            throw new Error(error.message);
        }
    }
}

export default AppFactory;