const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ProductAttribute = require("../../models/ProductAttribute");

const productAttributeController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let productAttribute = new ProductAttribute({
                      relatedProduct: req.body.relatedProduct,
                      title: req.body.title,
                      value: req.body.value,
                      en_title: req.body.en_title,
                      en_value: req.body.en_value,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await productAttribute.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(productAttribute)
                }
                return res.send({result: productAttribute})
            }
            catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getList: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                res.send(await baseResults(ProductAttribute, 'list', req.query, true, ['relatedProduct']))
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    getDetail: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const productAttribute  = await ProductAttribute.findById(id)
                if(productAttribute){
                    
                          
                            return res.send(await baseResults(ProductAttribute, 'id', req.params, false, ['relatedProduct']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no ProductAttribute with this id"})
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    put: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const productAttribute  = await ProductAttribute.findById(id)
                if(productAttribute){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => productAttribute[item] = req.body[item])
                    const updatedProductAttribute = await productAttribute.save();
                    if(updatedProductAttribute ){
                        return res.send({result: updatedProductAttribute })
                    }else{
                       return res.status(500).send({message: 'Error in updating ProductAttribute'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no ProductAttribute with this id'})
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    },
    delete: {
        middlewares: [
            authenticateJwtToken(['admin', ]),
        ],
        controller: async (req, res, next) => {
            try{
                const productAttribute = await ProductAttribute.findById(req.params.id);
                if (productAttribute) {
                      await productAttribute.deleteOne({_id: req.params.id});
                        res.send({ message: "ProductAttribute Deleted" });
                } else {
                  res.status(404).send({ message: "ProductAttribute Not Found" });
                }
            }catch (error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log(error)
                }
                res.status(500).send({message: error})
                next()
            }
        }
    }
};

module.exports = productAttributeController;

