import { faker } from '@faker-js/faker'



export const generateUser = ()=>{
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({min:1,max:90}),
        password: faker.internet.password({ length: 20 }),
        role:null,
        cart:null,
        isAdmin: false,
    }
}

//role:"647fd20fb16b39892de4c6aa",