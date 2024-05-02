const path=require('path')
const rootdir=require('../pathdir/path');

exports.contactcontroller= (req,res)=>{
    res.sendFile(path.join(rootdir, '..', 'views','contact.html'))
};