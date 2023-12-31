const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const ProductImage = require("../../models/ProductImage");

const productImageController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
                  upload('productImage').fields([{name: 'image', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let productImage = new ProductImage({
                      relatedProduct: req.body.relatedProduct,
                      image: generateFileName(req.files.image[0], 'productImage'),
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await productImage.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(productImage)
                }
                return res.send({result: productImage})
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
                res.send(await baseResults(ProductImage, 'list', req.query, true, ['relatedProduct']))
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
                const productImage  = await ProductImage.findById(id)
                if(productImage){
                    
                          
                            return res.send(await baseResults(ProductImage, 'id', req.params, false, ['relatedProduct']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no ProductImage with this id"})
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
                  upload('productImage').fields([{name: 'image', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const productImage  = await ProductImage.findById(id)
                if(productImage){
                  
                    
                    productImage.image = req.files.image[0] ? generateFileName(req.files.image[0], 'productImage') : productImage.image
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => productImage[item] = req.body[item])
                    const updatedProductImage = await productImage.save();
                    if(updatedProductImage ){
                        return res.send({result: updatedProductImage })
                    }else{
                       return res.status(500).send({message: 'Error in updating ProductImage'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no ProductImage with this id'})
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
                const productImage = await ProductImage.findById(req.params.id);
                if (productImage) {
                      await productImage.deleteOne({_id: req.params.id});
                        res.send({ message: "ProductImage Deleted" });
                } else {
                  res.status(404).send({ message: "ProductImage Not Found" });
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

module.exports = productImageController;

