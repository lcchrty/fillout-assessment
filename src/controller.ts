import { Request, Response, NextFunction, RequestHandler } from 'express'

interface FormControllerType {
	getResponses: RequestHandler
}


const controller: FormControllerType = {

	getResponses: () => {

	}


}

export default controller