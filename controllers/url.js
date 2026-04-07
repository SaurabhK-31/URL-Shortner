const shortid = require('shortid');
const url = require('../models/url_db');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    try {
        const short_id = shortid.generate();
        await url.create({
            short_id,
            redirecturl: body.url,
            visits: [],
            createdBy: req.user ? req.user.id : null
        });
        return res.status(200).json({ id: short_id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create short URL' });
    }
}

async function handleGetAnalytics(req, res) {
    const { short_id } = req.params;
    try {
        const entry = await url.findOne({ short_id });
        if (!entry) return res.status(404).json({ error: 'Short URL not found' });
        return res.status(200).json({
            id: entry.short_id,
            redirecturl: entry.redirecturl,
            totalClicks: entry.visits.length,
            visits: entry.visits,
            createdAt: entry.createdAt
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function handleGetUserHistory(req, res) {
    try {
        const urls = await url.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json(urls.map(u => ({
            id: u.short_id,
            redirecturl: u.redirecturl,
            totalClicks: u.visits.length,
            createdAt: u.createdAt
        })));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function handleDeleteURL(req, res) {
    const { short_id } = req.params;
    try {
        const entry = await url.findOne({ short_id });
        if (!entry) return res.status(404).json({ error: 'Not found' });
        if (String(entry.createdBy) !== String(req.user.id))
            return res.status(403).json({ error: 'Unauthorized' });
        await url.deleteOne({ short_id });
        return res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, handleGetUserHistory, handleDeleteURL };
