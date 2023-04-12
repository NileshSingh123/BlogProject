const AboutModel = require('../modals/About')
const BlogModel =require('../modals/Blog')
const CategoryModel = require('../modals/Category')
class FrontController{

    static home =async(req,res)=>{
        try{
        const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
        console.log(blogs)
        res.render('home',{b:blogs})
        }catch(error){
            console.log(error)

        }
    }
    static about =async(req,res)=>{
        try{
            const about =await AboutModel.findOne()
            //console.log(about)   
            res.render('about',{a:about})
        }catch{
            console.log(error)
        }
        
    }
    static contact =(req,res)=>{
        res.render('contact')
    }
    static blog =async (req,res)=>{
        try{
            const blog =await BlogModel.find().sort({_id:-1})
            console.log('blog')
            res.render('blog',{b:blog})
        }catch(error){
           console.log(error)
        }
        
    }


    static login = async (req,res)=>{
       try{
        res.render('login',{message: req.flash('error')})
       }
       catch(error){
        console.log (error)
       }
        
    }


    static register = async (req,res)=>{
        try{
            res.render('register',{message:req.flash('error')})
        }
        catch(error){
        console.log(error)
        }   
       
    }


    static detail =async(req,res)=>{
        try{
          const detail = await BlogModel.findById(req.params.id)
         const recentblogs = await BlogModel.find().limit(6)
         const category = await CategoryModel.find()
         res.render('detail',{d:detail,r:recentblogs,c:category})
          console.log(detail)
        }catch(error){
            console.log(error)
        }
        // res.render('detail')
    }

   

}
module.exports=FrontController