const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class PoductsServices {
  constructor() { 
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }
  
  async created(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }
  
  async find() {
    return this.products
  }
  
  async findOne(id) {
    const product = this.products.find(product => product.id === id)
    if(!product) {
      throw boom.notFound('Product not found')
    }
    if (product.isBlock) { 
      throw boom.conflict('Product is blocked')
    }
    return product
  }

  async update(id, changes) { 
    const findIndex = this.products.findIndex(product => product.id === id)
    if(findIndex === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[findIndex]
    this.products[findIndex] = {
      ...product,
      ...changes
    }
    return this.products[findIndex]
  }
 
  async delete(id) { 
  const findIndex = this.products.findIndex(product => product.id === id)
    if(findIndex === -1) {
      throw boom.notFound('Product not found')
    }
    this.products.splice(findIndex, 1)
    return { id }
  }
}

module.exports = PoductsServices
