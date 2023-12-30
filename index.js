import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectBD from './config/db.js';
// 0. Import route files ./routes/...
import customersRoutes from './routes/customersRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

// 1. app contains all server functionality
const app = express();
// 2. Enable express to send json data (registration form)
app.use(express.json());
// 3. Call dotenv configuration
dotenv.config();
// 4. Call DB connect function
connectBD();
// 5. Allow CORS
// Admitted domains
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //console.log(origin);
        // Request for admitted domains (whiteList)
        const admitted = whiteList.some(domain => domain === origin);
        if (admitted) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
// Cors
app.use(cors(corsOptions))

// 6. Route management
app.use("/", customersRoutes);
app.use("/", productsRoutes);
app.use("/", ordersRoutes);
app.use("/", usersRoutes);

// 8. Makes the uploads folder public.
app.use(express.static('uploads'));

// 7. Set port to DHCP
const PORT = process.env.PORT || 4000;
// 3. Register the server on port 4000
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})