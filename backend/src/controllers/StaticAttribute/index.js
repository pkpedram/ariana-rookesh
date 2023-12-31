const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const StaticAttribute = require("../../models/StaticAttribute");

const staticAttributeController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
                  upload('staticAttribute').fields([{name: 'icon', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let staticAttribute = new StaticAttribute({
                      title: req.body.title,
                      en_title: req.body.en_title,
                      icon: generateFileName(req.files.icon[0], 'staticAttribute'),
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await staticAttribute.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(staticAttribute)
                }
                return res.send({result: staticAttribute})
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
                res.send(await baseResults(StaticAttribute, 'list', req.query, true, []))
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
                const staticAttribute  = await StaticAttribute.findById(id)
                if(staticAttribute){
                    
                          
                            return res.send(await baseResults(StaticAttribute, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no StaticAttribute with this id"})
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
                  upload('staticAttribute').fields([{name: 'icon', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const staticAttribute  = await StaticAttribute.findById(id)
                if(staticAttribute){
                  
                    
                    staticAttribute.icon = req.files.icon[0] ? generateFileName(req.files.icon[0], 'staticAttribute') : staticAttribute.icon
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => staticAttribute[item] = req.body[item])
                    const updatedStaticAttribute = await staticAttribute.save();
                    if(updatedStaticAttribute ){
                        return res.send({result: updatedStaticAttribute })
                    }else{
                       return res.status(500).send({message: 'Error in updating StaticAttribute'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no StaticAttribute with this id'})
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
                const staticAttribute = await StaticAttribute.findById(req.params.id);
                if (staticAttribute) {
                      await staticAttribute.deleteOne({_id: req.params.id});
                        res.send({ message: "StaticAttribute Deleted" });
                } else {
                  res.status(404).send({ message: "StaticAttribute Not Found" });
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

module.exports = staticAttributeController;

