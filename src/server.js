import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const baseUrl = dev ? '/' : '/licence';

polka() // You can also use Express
.use(json())
.post('/materials', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	/* Retrieves the data */
	var data = req.body
	// Do something with the data...
	console.log('server', {data, body: req.body});
	/* Returns the result */
	return res.end(JSON.stringify({ success: true }))
})
.use(
	baseUrl,
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
.listen(PORT, err => {
	if (err) console.log('error', err);
});
