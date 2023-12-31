const { authenticateJwtToken } = require("../../core/middlewares/jwt");
const { upload } = require("../../core/middlewares/multer");
const { baseResults } = require("../../core/utils/Results");
const { generateFileName } = require("../../core/utils/multer");

const BlogPost = require("../../models/BlogPost");

const blogPostController = {
    post: {
        middlewares: [
            authenticateJwtToken(['admin',   ]),
                  upload('blogPost').fields([{name: 'image', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let blogPost = new BlogPost({
                      title: req.body.title,
                      en_title: req.body.en_title,
                      content: req.body.content,
                      en_content: req.body.en_content,
                      image: generateFileName(req.files.image[0], 'blogPost'),
                      isActive: req.body.isActive,
                      created_date: new Date()
                
                })
                await blogPost.save()
                if(process.env.NODE_ENV !== 'production'){
                    console.log(blogPost)
                }
                return res.send({result: blogPost})
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
                res.send(await baseResults(BlogPost, 'list', req.query, true, []))
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
                const blogPost  = await BlogPost.findById(id)
                if(blogPost){
                    
                          
                            return res.send(await baseResults(BlogPost, 'id', req.params, false, []))
                          
                           
                }else{
                    res.status(404).send({message: "There is no BlogPost with this id"})
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
                  upload('blogPost').fields([{name: 'image', maxCount: 1}]), 
        ],
        controller: async (req, res, next) => {
            try{
                let id = req.params.id;
                const blogPost  = await BlogPost.findById(id)
                if(blogPost){
                  
                    
                    blogPost.image = req.files.image[0] ? generateFileName(req.files.image[0], 'blogPost') : blogPost.image
                    
                    let keys = Object.keys(req.body); 
                    keys.map(item => blogPost[item] = req.body[item])
                    const updatedBlogPost = await blogPost.save();
                    if(updatedBlogPost ){
                        return res.send({result: updatedBlogPost })
                    }else{
                       return res.status(500).send({message: 'Error in updating BlogPost'})
                    }
                }else{
                   return res.status(404).send({message: 'There is no BlogPost with this id'})
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
                const blogPost = await BlogPost.findById(req.params.id);
                if (blogPost) {
                      await blogPost.deleteOne({_id: req.params.id});
                        res.send({ message: "BlogPost Deleted" });
                } else {
                  res.status(404).send({ message: "BlogPost Not Found" });
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

module.exports = blogPostController;

