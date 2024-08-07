import express from 'express';
import session from 'express-session'; // Aggiungi questa riga
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import multer from 'multer';
import { storage } from './config/cloudinary.js';

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

dotenv.config();

const app = express();

// Connessione al database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configurazione CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Role'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configura express-session
app.use(session({
  secret: process.env.SESSION_SECRET , // Usa una variabile d'ambiente per il segreto
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 ore
  }
}));

// Inizializza Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurazione di multer con lo storage di Cloudinary
const upload = multer({ storage: storage });

// Middleware per il logging delle richieste
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/animals', upload.single('image'), animalRoutes);
app.use('/api/events', upload.single('image'), eventRoutes);
app.use('/api/blog', upload.single('image'), blogRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', upload.single('avatar'), userRoutes);

// Middleware per la gestione degli errori (deve essere l'ultimo)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Elenca gli endpoint
  console.log('Lista degli endpoint:');
  console.table(listEndpoints(app));
});

export default app;