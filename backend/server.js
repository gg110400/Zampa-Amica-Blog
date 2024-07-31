import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Importa le tue rotte
import animalRoutes from './routes/animalRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passport from './config/passport.js';

// Importa il middleware di gestione degli errori
import errorHandler from './middleware/errorHandler.js';

// Importa la configurazione CORS
import corsConfig from './config/corsConfig.js';

dotenv.config();

const app = express();

// Connessione al database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/animals', animalRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

// Middleware per la gestione degli errori (deve essere l'ultimo)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;