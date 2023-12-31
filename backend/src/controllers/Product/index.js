const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Product = require("../../models/Product");

const productController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let product = new Product({
                      name: req.body.name,
                      en_name: req.body.en_name,
                      description: req.body.description,
                      en_description: req.body.en_description,
                      price: req.body.price,
                      showPrice: req.body.showPrice,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await product.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(product)
                }
                return res.send({result: product})
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
                res.send(await baseResults(Product, 'list', req.query, true, []))
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
                const product  = await Product.findById(id)
                if(product){
                    
                          
                            return res.send(await baseResults(Product, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no Product with this id"})
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
                const product  = await Product.findById(id)
                if(product){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => product[item] = req.body[item])
                    const updatedProduct = await product.save();
                    if(updatedProduct ){
                        return res.send({result: updatedProduct })
                    }else{
                       return res.status(500).send({message: 'Error in updating Product'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no Product with this id'})
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
                const product = await Product.findById(req.params.id);
                if (product) {
                      await product.deleteOne({_id: req.params.id});
                        res.send({ message: "Product Deleted" });
                } else {
                  res.status(404).send({ message: "Product Not Found" });
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

module.exports = productController;

