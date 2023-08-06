const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { model } = require('../db')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,}, 
    password: {type: DataTypes.STRING}, 
    role: {type: DataTypes.STRING, defaultValue: "USER"}, 
})
const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketDevice = sequelize.define('basket_device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},//strange
})
const Device = sequelize.define('device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    img: {type: DataTypes.STRING, allowNull: false},
})
const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, allowNull: false},
})
const DeviceInfo = sequelize.define('device_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const TypeBrand = sequelize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ContactUs = sequelize.define('contact_us', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    message: { type: DataTypes.STRING, allowNull: false },
});

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    country: {type: DataTypes.STRING},
    firstName: {type: DataTypes.STRING},
    lastName: { type: DataTypes.STRING},
    address: {type: DataTypes.STRING,allowNull: false},
    house: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    email: { type: DataTypes.STRING},
    phone: { type: DataTypes.STRING },
    typepay: { type: DataTypes.STRING}
});

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING},
    moderated: {type: DataTypes.BOOLEAN, defaultValue: false},
});
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(Device)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.hasMany(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})
//старнно
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

BasketDevice.belongsTo(Basket);
BasketDevice.belongsTo(Device);

Order.belongsTo(Basket);
Basket.hasMany(Order);

//new
Order.belongsTo(BasketDevice);
BasketDevice.hasMany(Order);

Order.belongsTo(BasketDevice);
 module.exports = {
    User, 
    Basket, 
    BasketDevice,
    Device, 
    Type, 
    Brand, 
    Rating,
    TypeBrand,
    DeviceInfo,
    ContactUs,
    Order,
    Review,
 }
