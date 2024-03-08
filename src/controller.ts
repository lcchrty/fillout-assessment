import { Request, Response, NextFunction, RequestHandler } from 'express'

interface FormControllerType {
	getResponses: RequestHandler
}


const controller: FormControllerType = {

	getResponses: (req: Request, res: Response, next: NextFunction) => {
		res.locals.hey = "Hey, Chip"
		return next()
	}


}

export default controller