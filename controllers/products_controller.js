const Products = require('../models/products')

// to create new product
module.exports.create = function(req, res, next){
    console.log(req.body);

    Products.create({

        // id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity
    })
    .then(function(product){
        let oneProduct= {
            name: product.name, 
            quantity: product.quantity
        };
        res.status(200).json({
            data: {
                product: oneProduct
            }
        });
    })
    .catch(next);
}

// fetching all products and returning them
module.exports.home = async function(req, res){
    try{

        // keys with 0 value won't be displayed
        let products = await Products.find({}, { '_id': 0, 'id' :1, 'name': 1, 'quantity': 1 }).exec();
        return res.status(200).json({
            data: {
                products: products
            }
        })

    }
    catch(err){
        console.log('********', err);
        
        return res.json(500, {
            message: "Internal Server Error"
        });
    } 
}

// to delete a product
module.exports.delete = async function(req, res, next){
    
    //console.log(req.params);
    let product = await Products.findOne({id: req.params.id});
    if(product === null){
        return res.status(412).json( {
            message: 'Product does not exist'
        });

    }
    // fetching deleted product in products
    let products = await Products.findOneAndDelete({id: req.params.id}, 
        function(err){
            
            // console.log(product)
            // if product is null then there was no product with given id
            if(err ){ 
                
                console.log('Cannot delete product ',err); 
                return res.status(412).json({
                    data:{
                        message: 'Product does not exist'
                    }
                });

            }

        return res.status(200).json({
            data: { 
                // product: products,
                message: 'Product deleted'
            }
        });

    }).clone()
    .catch(function(err){
        console.log('error : ',err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    });
}

// to update a product
module.exports.update = async function(req, res, next){

    // filter by which we will select particular product to be changed
    const filter = { id: req.params.id };

    // to get previous value of product
    let product = await Products.findOne({id: req.params.id});
    if(product === null){
        return res.status(412).json( {
            message: 'Product does not exist'
        });

    }

    // to find updated value in sum
    let sum =parseInt(req.query.number) + product.quantity ;
    
    // id updated value is less than 0 then make it 0 
    const update = { quantity:  sum < 0 ? 0 : sum };
    
    // updating product
    let doc = await Products.findOneAndUpdate(filter, update, {new: true}, 
        function(err, updated){
            if(err ){ 
                // if doc is null then there was no product with given id
                console.log('Cannot update product : ', err); 
                return res.status(412).json( {
                    message: 'Product does not exist'
                });
            }
            return res.status(200).json({
                data: {
                    product: updated,
                    message: 'updated successfully'
                }
            }) 
        }, {new: true}).select({_id: 0, __v:0}).clone().catch(function(err){
            console.log('error : ',err);
            next();
        }).catch(function(err){
            console.log('error : ',err);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        });
}
