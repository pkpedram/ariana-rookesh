const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Province = require("../../models/Province");

const provinceController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let province = new Province({
                      name: req.body.name,
                      en_name: req.body.en_name,
                      ordering: req.body.ordering,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await province.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(province)
                }
                return res.send({result: province})
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
                res.send(await baseResults(Province, 'list', req.query, true, []))
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
                const province  = await Province.findById(id)
                if(province){
                    
                          
                            return res.send(await baseResults(Province, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no Province with this id"})
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
                const province  = await Province.findById(id)
                if(province){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => province[item] = req.body[item])
                    const updatedProvince = await province.save();
                    if(updatedProvince ){
                        return res.send({result: updatedProvince })
                    }else{
                       return res.status(500).send({message: 'Error in updating Province'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no Province with this id'})
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
                const province = await Province.findById(req.params.id);
                if (province) {
                      await province.deleteOne({_id: req.params.id});
                        res.send({ message: "Province Deleted" });
                } else {
                  res.status(404).send({ message: "Province Not Found" });
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

module.exports = provinceController;

