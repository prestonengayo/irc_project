import http from 'http';
import app from './app'; // Import the configured Express instance from app.ts

const PORT = 3000;

const server = http.createServer(app); // use app here

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
