const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model/review'); 
const Review = require('./model/review');
const path = require('path');

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { companyName, pros, cons, rating } = req.body;

  try {
    const review = await Review.create({ companyName, pros, cons, rating });
    console.log('Review added:', review);
    res.redirect('/');
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send('Error adding review');
  }
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.companyName;

  try {
    const reviews = await Review.findAll({
      where: {
        companyName: sequelize.where(sequelize.fn('LOWER', sequelize.col('companyName')), 'LIKE', `%${searchTerm.toLowerCase()}%`)
      }
    });

    const averageRating = calculateAverageRating(reviews);
    res.send({ reviews, averageRating });
  } catch (error) {
    console.error('Error searching reviews:', error);
    res.status(500).send('Error searching reviews');
  }
});

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
}

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to synchronize database:', err);
});
