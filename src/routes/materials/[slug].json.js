import { materials } from '../../../data.js';

const lookup = new Map();

materials.forEach(item => lookup.set(item.slug, JSON.stringify(item)));

const jsonContent = {
    'Content-Type': 'application/json'
}

export function get(req, res) {
    const { slug } = req.params;

    if (lookup.has(slug)) {
        res.writeHead(200, jsonContent);

        res.end(lookup.get(slug));
    } else {
        res.writeHead(404, jsonContent);
        res.end(JSON.stringify({message: 'Not Found'}))
    }
}