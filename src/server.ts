import http from 'http';
import app from './app'; // Import the configured Express instance from app.ts

const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // use app here

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
