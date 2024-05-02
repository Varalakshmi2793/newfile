const Sequelize= require('sequelize');
const DataTypes= Sequelize;

const sequelize = new Sequelize('companyreview', 'root', 'Password@123', {
  dialect:'mysql',
  host:'localhost'
});

const Review = sequelize.define('Review', {
  companyName: {
    type: DataTypes.STRING,

  },
  pros: {
    type: DataTypes.TEXT,
  },
  cons: {
    type: DataTypes.TEXT,
     },
  rating: {
    type: DataTypes.INTEGER,
    }
});



module.exports=Review;
