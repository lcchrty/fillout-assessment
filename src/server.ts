import express, { Request, Response, NextFunction } from 'express'
import formController from "./controller.ts"

const app = express()


app.use(express.json())

app.get('/api', formController.getResponses, (req, res,) => {
	return res.status(200).json({ "hey": "hey" })
})