const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const GeneralSetting = require("../../models/GeneralSetting");

const generalSettingController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
                  upload('generalSetting').fields([{name: 'logo', maxCount: 1},{name: 'catalog', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let generalSetting = new GeneralSetting({
                      title: req.body.title,
                      en_title: req.body.en_title,
                      phoneNumber: req.body.phoneNumber,
                      secondaryColor: req.body.secondaryColor,
                      aboutUs: req.body.aboutUs,
                      en_aboutUs: req.body.en_aboutUs,
                      contactUs: req.body.contactUs,
                      en_contactUs: req.body.en_contactUs,
                      email: req.body.email,
                      address: req.body.address,
                      en_address: req.body.en_address,
                      logo: generateFileName(req.files.logo[0], 'generalSetting'),
                      catalog: generateFileName(req.files.catalog[0], 'generalSetting'),
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await generalSetting.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(generalSetting)
                }
                return res.send({result: generalSetting})
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
                res.send(await baseResults(GeneralSetting, 'list', req.query, true, []))
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
                const generalSetting  = await GeneralSetting.findById(id)
                if(generalSetting){
                    
                          
                            return res.send(await baseResults(GeneralSetting, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no GeneralSetting with this id"})
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
                  upload('generalSetting').fields([{name: 'logo', maxCount: 1},{name: 'catalog', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const generalSetting  = await GeneralSetting.findById(id)
                if(generalSetting){
                  
                    
                    generalSetting.logo = req.files.logo[0] ? generateFileName(req.files.logo[0], 'generalSetting') : generalSetting.logo
                    generalSetting.catalog = req.files.catalog[0] ? generateFileName(req.files.catalog[0], 'generalSetting') : generalSetting.catalog
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => generalSetting[item] = req.body[item])
                    const updatedGeneralSetting = await generalSetting.save();
                    if(updatedGeneralSetting ){
                        return res.send({result: updatedGeneralSetting })
                    }else{
                       return res.status(500).send({message: 'Error in updating GeneralSetting'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no GeneralSetting with this id'})
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
                const generalSetting = await GeneralSetting.findById(req.params.id);
                if (generalSetting) {
                      await generalSetting.deleteOne({_id: req.params.id});
                        res.send({ message: "GeneralSetting Deleted" });
                } else {
                  res.status(404).send({ message: "GeneralSetting Not Found" });
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

module.exports = generalSettingController;

