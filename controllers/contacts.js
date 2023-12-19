const {Contact} = require('../models/contact');

 const HttpError = require('../helpers/HttpError');

const { ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {

     const {_id : owner} = req.user;    
     const result =await Contact.find({owner}).populate("owner", "name email");
     res.json(result);  
  }

  const getById =async (req, res) => {
      const {_id : owner} = req.user;    
      const {contactId} = req.params;
      const result = await Contact.findById(contactId, owner);
      console.log(result);

      if(!result){
        throw HttpError(404, "Not Found");
    }
      
      res.status(200).json(result).status(200);
    }


  const add = async (req, res) => {
      const {_id : owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result);
    
  }

  const deleteById = async (req, res) => {
      const {_id : owner} = req.user;  
      const {contactId} = req.params;
      const result = await Contact.findByIdAndDelete(contactId, owner);
      
      if(!result){
        throw HttpError(404, "Not Found");
        }

      res.status(200).json({
        message:"Contact deleted"
      }) 
    
  }

  const updateById = async (req, res) => {      
        const {_id : owner} = req.user; 
        const {contactId} = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new : true}, owner);
        if(!result){
            throw HttpError(404, "Not found");
        }
        res.status(200).json(result);        
    
  }

  const updateStatusContact = async (req, res) => {      
    const {_id : owner} = req.user;
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new : true}, owner);
   
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);        

}

  module.exports= {
    getAll: ctrlWrapper(getAll),
    getById:ctrlWrapper(getById),
    add:ctrlWrapper(add),
    deleteById:ctrlWrapper(deleteById),
    updateById:ctrlWrapper(updateById),
    updateStatusContact:ctrlWrapper(updateStatusContact)
  }