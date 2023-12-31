const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const BlogCategory = require("../../models/BlogCategory");

const blogCategoryController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
            
        ],
        controller: async (req, res, next) => {
            try{
                let blogCategory = new BlogCategory({
                      title: req.body.title,
                      en_title: req.body.en_title,
                      image: req.body.image,
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await blogCategory.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(blogCategory)
                }
                return res.send({result: blogCategory})
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
                res.send(await baseResults(BlogCategory, 'list', req.query, true, []))
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
                const blogCategory  = await BlogCategory.findById(id)
                if(blogCategory){
                    
                          
                            return res.send(await baseResults(BlogCategory, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no BlogCategory with this id"})
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
                const blogCategory  = await BlogCategory.findById(id)
                if(blogCategory){
                  
                    
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => blogCategory[item] = req.body[item])
                    const updatedBlogCategory = await blogCategory.save();
                    if(updatedBlogCategory ){
                        return res.send({result: updatedBlogCategory })
                    }else{
                       return res.status(500).send({message: 'Error in updating BlogCategory'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no BlogCategory with this id'})
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
                const blogCategory = await BlogCategory.findById(req.params.id);
                if (blogCategory) {
                      await blogCategory.deleteOne({_id: req.params.id});
                        res.send({ message: "BlogCategory Deleted" });
                } else {
                  res.status(404).send({ message: "BlogCategory Not Found" });
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

module.exports = blogCategoryController;

