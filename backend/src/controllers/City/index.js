const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const City = require("../../models/City");

const cityController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let city = new City({
                      name: req.body.name,
                      en_name: req.body.en_name,
                      ordering: req.body.ordering,
                      relatedProvince: req.body.relatedProvince,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await city.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(city)
                }
                return res.send({result: city})
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
                res.send(await baseResults(City, 'list', req.query, true, ['relatedProvince']))
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
                const city  = await City.findById(id)
                if(city){
                    
                          
                            return res.send(await baseResults(City, 'id', req.params, false, ['relatedProvince']))
                          
                           
                }else{
                    res.status(404).send({message: "There is no City with this id"})
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
                const city  = await City.findById(id)
                if(city){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => city[item] = req.body[item])
                    const updatedCity = await city.save();
                    if(updatedCity ){
                        return res.send({result: updatedCity })
                    }else{
                       return res.status(500).send({message: 'Error in updating City'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no City with this id'})
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
                const city = await City.findById(req.params.id);
                if (city) {
                      await city.deleteOne({_id: req.params.id});
                        res.send({ message: "City Deleted" });
                } else {
                  res.status(404).send({ message: "City Not Found" });
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

module.exports = cityController;

