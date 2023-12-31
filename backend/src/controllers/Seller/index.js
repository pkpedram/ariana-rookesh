const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Seller = require("../../models/Seller");

const sellerController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let seller = new Seller({
                      name: req.body.name,
                      relatedCity: req.body.relatedCity,
                      description: req.body.description,
                      en_name: req.body.en_name,
                      en_description: req.body.en_description,
                      phoneNumber: req.body.phoneNumber,
                      code: req.body.code,
                      address: req.body.address,
                      agentName: req.body.agentName,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await seller.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(seller)
                }
                return res.send({result: seller})
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
                res.send(await baseResults(Seller, 'list', req.query, true, ['relatedCity']))
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
                const seller  = await Seller.findById(id)
                if(seller){
                    
                          
                            return res.send(await baseResults(Seller, 'id', req.params, false, ['relatedCity']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no Seller with this id"})
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
                const seller  = await Seller.findById(id)
                if(seller){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => seller[item] = req.body[item])
                    const updatedSeller = await seller.save();
                    if(updatedSeller ){
                        return res.send({result: updatedSeller })
                    }else{
                       return res.status(500).send({message: 'Error in updating Seller'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no Seller with this id'})
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
                const seller = await Seller.findById(req.params.id);
                if (seller) {
                      await seller.deleteOne({_id: req.params.id});
                        res.send({ message: "Seller Deleted" });
                } else {
                  res.status(404).send({ message: "Seller Not Found" });
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

module.exports = sellerController;

