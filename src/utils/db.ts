const mongoose = require('mongoose');

// Connexion string
const mongoURI = 'mongodb+srv://team:gIkEwOcKbxr9o1bk@myirc.p4cjyiw.mongodb.net/test';


// Database connection function
export const connectDB = async () => {
    try {
      mongoose.connect(mongoURI);
      console.log('Connexion à MongoDB réussie !');
    } catch (error) {
      console.error('Connexion à MongoDB échouée :', error);
      process.exit(1); 
    }
  };
  