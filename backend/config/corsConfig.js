const corsConfig = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Assumendo che il frontend sia su questa porta
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  export default corsConfig;