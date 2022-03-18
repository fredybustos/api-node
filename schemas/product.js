const Joi = require('joi')

const id = Joi.string().guid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const isBlock = Joi.boolean()

const createProductScheme = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
})

const updateProductScheme = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock
})

const getProductScheme = Joi.object({
  id: id.required(),
})

module.exports = { createProductScheme, updateProductScheme, getProductScheme }
