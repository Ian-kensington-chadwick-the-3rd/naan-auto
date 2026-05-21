const mongoose = require('mongoose');

let cachedDb = null;

async function connectDB() {
    if (cachedDb && mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = mongoose.connection;
}

const Car = mongoose.models.Car || mongoose.model('Car', new mongoose.Schema({}, { strict: false }));

module.exports = async (req, res) => {
    try {
        await connectDB();

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

        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(xml);
    } catch (err) {
        console.error('Sitemap error:', err);
        res.status(500).send('Error generating sitemap');
    }
};
