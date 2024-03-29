import express, { Request, Response, NextFunction } from 'express'
import formController from "./controller"

type ServerError = {
	log: string,
	status: number,
	message: { err: string }
}

const app = express()


app.use(express.json())

app.get(`/api/:formId/filteredresponses`, formController.getResponses, (req, res,) => {
	return res.status(200).json(res.locals.responses)
})

app.use('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
	const defaultErr: ServerError = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj: ServerError = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
})

app.listen(3000, () => console.log('server is listening on port 3000'));