require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { Car } = require('./models/carschema');
const seedDataBase = require('../server/seeders/password')
const db = require('./config/connection');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

const getUserFromToken = (token) => {
    try {
        if (token === null) {
            throw new Error('token is null')
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const verifiedToken = jwt.verify(token, jwtSecretKey)
        return verifiedToken
    } catch (e) {
        console.error("index.js invalid token", e.message)
        return null;

    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});



const startApolloServer = async () => {
    await server.start();


    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: [
            'https://naan-auto.vercel.app',
            'https://naanauto.com/inventory',
            'https://naanauto.com',
            'https://www.naanauto.com',
            'http://localhost:3000',
        ],
        credentials: true,
    }))

    app.use('/graphql', expressMiddleware(server, {

        context: async ({ req, res }) => {
            const authHeader = req?.headers?.authorization || ""
            const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
            const userDecoded = getUserFromToken(token);

            const rawIp = req.headers['x-forwarded-for']?.split(',')[0] ||
                req.socket?.remoteAddress || null;
            const ip = rawIp === '::1' ? '127.0.0.1' : rawIp;


            return { user: userDecoded, ip, req, res };
        }
    }))


    app.get('/sitemap.xml', async (req, res) => {
        try {
            const cars = await Car.find({}, '_id updatedAt').lean();
            const baseUrl = 'https://naanauto.com';
            const today = new Date().toISOString().split('T')[0];

            const staticPages = [
                { url: '/', priority: '1.0', changefreq: 'weekly' },
                { url: '/inventory', priority: '1.0', changefreq: 'daily' },
                { url: '/aboutUs', priority: '0.8', changefreq: 'monthly' },
                { url: '/contactUs', priority: '0.8', changefreq: 'monthly' },
            ];

            const staticXml = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

            const carXml = cars.map(car => `
  <url>
    <loc>${baseUrl}/inventory/${car._id}</loc>
    <lastmod>${car.updatedAt ? new Date(car.updatedAt).toISOString().split('T')[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('');

            const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${carXml}
</urlset>`;

            res.header('Content-Type', 'application/xml');
            res.send(xml);
        } catch (err) {
            console.error('Sitemap error:', err);
            res.status(500).send('Error generating sitemap');
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        })
    }

    db.once('open', () => {
        seedDataBase();

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)

        })
    })
};

startApolloServer();