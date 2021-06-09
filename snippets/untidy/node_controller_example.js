'use strict';

var Example = require('../models/example');
let Validator = require('validatorjs');

var controller = {
    //basic get [GET]
    get: (req, res) => {
        Example.find({}).exec((err, examples)=>{
            if(err){
                return res.status(404).send({
                    status: 'error',
                    type: 'save',
                    data: 'Error not found message',
                }); 
            }else if(!examples){
                return res.status(500).send({
                    status: 'error',
                    type: 'save',
                    data: 'Server error message',
                }); 
            }else{
                return res.status(200).send({
                    status: 'success',
                    type: 'example',
                    examples: examples,
                });
            }
        });
        
    },

    /* Save new example [POST]
        @params body{json} form data
        @return {json} validator errors | success message
    */
    save: (req, res) => {
        //Collect post params
        var params = req.body;
         
        //Validate
        let validation = new Validator(params, {
            example: 'required',
        });
        if(validation.passes()){
            //Construct Object
            var example = new Example(params);
            example.save((err, exampleStored) =>  {
                if(err || !exampleStored){
                    return res.status(500).send({
                        status: 'error',
                        type: 'save',
                        data: 'Error message',
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    type: 'example',
                    example: exampleStored,
                });
            });
        }else{
            return res.status(200).send({
                status: 'error',
                type: 'validation',
                data: validation.errors,
            });
        }
    },
    
    /* Update example [PUT]
        @params body{json} form data
        @return {json} validator errors | success message
    */
    update: (req, res) => {
        //Collect post params
        var params = req.body;
         
        //Validate
        let validation = new Validator(params, {
            example: 'required',
        });
        if(validation.passes()){
            //Construct Object
            var _id = params._id;
            delete params._id;
            params.updated_at = Date.now();
            Example.replaceOne({_id}, params, (err, exampleStored) =>  {
                if(err || !exampleStored){
                    return res.status(500).send({
                        status: 'error',
                        type: 'save',
                        data: 'Error message',
                    });
                }
                params._id = _id;
                return res.status(200).send({
                    status: 'success',
                    type: 'example',
                    example: params
                });
            });
        }else{
            return res.status(200).send({
                status: 'error',
                type: 'validation',
                data: validation.errors,
            });
        }
    }
};

module.exports = controller;