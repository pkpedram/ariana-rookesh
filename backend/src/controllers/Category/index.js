const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const Category = require("../../models/Category");

const categoryController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
                  upload('category').fields([{name: 'banner', maxCount: 1},{name: 'icon', maxCount: 1},{name: 'catalog', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let category = new Category({
                      name: req.body.name,
                      en_name: req.body.en_name,
                      showOnHomePage: req.body.showOnHomePage,
                      slug: req.body.slug,
                      showProductPrices: req.body.showProductPrices,
                      banner: generateFileName(req.files.banner[0], 'category'),
                      icon: generateFileName(req.files.icon[0], 'category'),
                      catalog: generateFileName(req.files.catalog[0], 'category'),
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await category.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(category)
                }
                return res.send({result: category})
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
                res.send(await baseResults(Category, 'list', req.query, true, []))
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
                const category  = await Category.findById(id)
                if(category){
                    
                          
                            return res.send(await baseResults(Category, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no Category with this id"})
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
                  upload('category').fields([{name: 'banner', maxCount: 1},{name: 'icon', maxCount: 1},{name: 'catalog', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const category  = await Category.findById(id)
                if(category){
                  
                    
                    category.banner = req.files.banner[0] ? generateFileName(req.files.banner[0], 'category') : category.banner
                    category.icon = req.files.icon[0] ? generateFileName(req.files.icon[0], 'category') : category.icon
                    category.catalog = req.files.catalog[0] ? generateFileName(req.files.catalog[0], 'category') : category.catalog
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => category[item] = req.body[item])
                    const updatedCategory = await category.save();
                    if(updatedCategory ){
                        return res.send({result: updatedCategory })
                    }else{
                       return res.status(500).send({message: 'Error in updating Category'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no Category with this id'})
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
                const category = await Category.findById(req.params.id);
                if (category) {
                      await category.deleteOne({_id: req.params.id});
                        res.send({ message: "Category Deleted" });
                } else {
                  res.status(404).send({ message: "Category Not Found" });
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

module.exports = categoryController;

