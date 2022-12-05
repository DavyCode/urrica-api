import express from "express";

/**
 * Request headers
 */
export default async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
	// res.header('Access-Control-Max-Age', 600);
	/**
	 * Cache-Control
	 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
	 */
	res.header("Content-Type", "application/json");
	res.header("Connection", "keep-alive");
	res.header("Keep-Alive", "timeout=200");
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	} else {
		next();
	}
};
