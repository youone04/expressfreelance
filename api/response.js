exports.data = (values , res) => {
    let data = {
        'status' : 200,
         'values' : values
    }

   return res.json(data);
    // res.end();
}