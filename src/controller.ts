import { Request, Response, NextFunction, RequestHandler } from 'express'

interface FormControllerType {
	getResponses: RequestHandler
}


export const controller: FormControllerType = {

	getResponses: () => {

	}


}

