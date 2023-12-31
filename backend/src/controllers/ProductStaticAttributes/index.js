const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ProductStaticAttributes = require("../../models/ProductStaticAttributes");

const productStaticAttributesController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let productStaticAttributes = new ProductStaticAttributes({
                      relatedProduct: req.body.relatedProduct,
                      relatedStaticAttribute: req.body.relatedStaticAttribute,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await productStaticAttributes.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(productStaticAttributes)
                }
                return res.send({result: productStaticAttributes})
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
                res.send(await baseResults(ProductStaticAttributes, 'list', req.query, true, ['relatedProduct','relatedStaticAttribute']))
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
                const productStaticAttributes  = await ProductStaticAttributes.findById(id)
                if(productStaticAttributes){
                    
                          
                            return res.send(await baseResults(ProductStaticAttributes, 'id', req.params, false, ['relatedProduct','relatedStaticAttribute']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no ProductStaticAttributes with this id"})
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
                const productStaticAttributes  = await ProductStaticAttributes.findById(id)
                if(productStaticAttributes){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => productStaticAttributes[item] = req.body[item])
                    const updatedProductStaticAttributes = await productStaticAttributes.save();
                    if(updatedProductStaticAttributes ){
                        return res.send({result: updatedProductStaticAttributes })
                    }else{
                       return res.status(500).send({message: 'Error in updating ProductStaticAttributes'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no ProductStaticAttributes with this id'})
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
                const productStaticAttributes = await ProductStaticAttributes.findById(req.params.id);
                if (productStaticAttributes) {
                      await productStaticAttributes.deleteOne({_id: req.params.id});
                        res.send({ message: "ProductStaticAttributes Deleted" });
                } else {
                  res.status(404).send({ message: "ProductStaticAttributes Not Found" });
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

module.exports = productStaticAttributesController;

