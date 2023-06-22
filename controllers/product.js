const Product = require("../models/product");

const getAllProducts = async (req,res) => {
    const { company , name , featured, sort ,select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
        console.log(queryObject);
    }

    if (featured) {
        queryObject.featured = featured;
        
    }

    if (name){
        queryObject.name = { $regex : name, $options: "i"};
    
    }

    let apiData = Product.find(queryObject);

    if (sort) {
        // let sortFix = sort.replace(",","");
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
            // let selectFix = select.replace(","," ");
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        } 

        let page = Number(req.query.page) || 1 ;
        let limit = Number(req.query.page) || 10;
    
        let skip  = (page - 1 ) * limit;

        apiData = apiData.skip(3).limit(4);
        // apiData = apiData.skip(skip).limit(limit);

   // (select = name), company

    console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({Products,nbHits: Products.length});
    // const myData = await apiData.sort(sort);
    // const myData = await Product.find(req.query);
    // res.status(200).json({myData});
};

const getAllProductsTesting = async (req,res) => {
    console.log(req.query);
    const myData = await Product.find(req.query);

    // const myData = await Product.find(req.query).select("name ,company");
    //const myData = await Product.find(req.query).sort("name -price");
    //const myData = await Product.find(req.query).sort("name ");
    res.status(200).json({ myData , nbHits: myData.length});
};

module.exports = {getAllProducts,getAllProductsTesting};    