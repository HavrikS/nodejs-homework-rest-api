// const {Contact} = require("../../models/contact")

// const getAll = async (req, res) => {
//     const result = await Contact.find();
//     res.json(result)
// };

// module.exports = getAll;

const {Contact} = require("../../models/contact")

const getAll = async(req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.find({owner}).populate("owner", "email")
    res.json(result);
}

module.exports = getAll;