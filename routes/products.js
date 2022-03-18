const express = require('express')
const PoductsServices = require('./../services/product')
const validatorHanlder = require('./../middlewares/validator')
const { createProductScheme, updateProductScheme, getProductScheme } = require('./../schemas/product')

const router = express.Router()
const service = new PoductsServices()

router.get('/', (req, res) => {
  const products = service.find()
  res.json(products)
});

router.get('/:id',
  validatorHanlder(getProductScheme, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHanlder(createProductScheme, 'body'),
  async (req, res) => { 
    const body = req.body
    const product = await service.created(body)
    res.status(201).json(product)
  }
)

router.patch('/:id',
  validatorHanlder(getProductScheme, 'params'),
  validatorHanlder(updateProductScheme, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', async (req, res) => { 
  const { id } = req.params
  const productId = await service.delete(id)
  res.json(productId)
})

module.exports = router
