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

export const generateProduct = ()=>{
    return {
        title: `Cortante ${faker.commerce.product()}`,
        description: `${faker.commerce.productDescription()}, Tamaño ${faker.number.int({min:3,max:10})}`,
        price: faker.number.int({min:250,max:1500}),
        thumbnail: [],
        code: `CB${faker.number.int({min:1,max:500})}`,
        stock: faker.number.int({min:1,max:100}),
        status: true,
        category:"cortantes",
      }
}

//role:"647fd20fb16b39892de4c6aa",