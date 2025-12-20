const User = require ("./user.model");

// ===== QUERY =====
exports.findById = (id) => {
    return User.findOne({
        _id: id, is, isDeleted: false
    });
};

exports.findByIdWithPassword = (id) => {
    return User.findOne({_id: id, isDeleted: false}).select("+passwordHash");
};

exports.findAll = (filter = {}, options = {}) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const  skip = (page - 1) * limit;

    return Promise.all([
        User.find(filter)
        .sort(options.sort || "-craeteAt")
        .skip(skip)
        .limit(limit),
    User.countDocuments(filter),
    ]);
};

// ===== COMMAND =====
exports.updateById = (id, data) =>{
    return User.findByIdAndUpdate(id, data, { new: true});
};

exports.incrementAuthzVersion = (id) => {
    return User.findByIdAndUpdate(
        id,
        { $inc: { authzVersion: 1} },
        { new: true}
    );
};

exports.sortDelete = (id) =>{
    return User.findByIdAndUpdate(
        id,
        {
            isDeleted: true, isActive: false
        },
        {
            new: true
        }
    );
};