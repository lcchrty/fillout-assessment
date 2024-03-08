import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FilterClauseType, FormResponse, QuestionReponses } from './types';

dotenv.config()

/**
 * 
 * Test Filters:
 [
	{
		id: "jB2qDRcXQ8Pjo1kg3jre2J",
		condition: "equals",
		value: "Engineering"
	},
	{
		id: "bE2Bo4cGUv49cjnqZ4UnkW",
		condition: "does_not_equal",
		value: "Chip"
	},
	{
		id: "dSRAe3hygqVwTpPK69p5td",
		condition: "greater_than",
		value: "2024-03-23T05:01:47.691Z"
	}
]

 */


interface FormControllerType {
	getResponses: RequestHandler
}

const controller: FormControllerType = {

	getResponses: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { formId } = req.params;
			const { filters } = req.query

			const filterClause: FilterClauseType[] = JSON.parse(filters as string)

			const config: AxiosRequestConfig = {
				method: 'get',
				maxBodyLength: Infinity,
				url: `https://api.fillout.com/v1/api/forms/${formId}/submissions/`,
				headers: {
					'Authorization': `Bearer ${process.env.FILLOUT_API_KEY}`
				}
			};
			const data: AxiosResponse = await axios.request(config)
			const unfilteredResponses: FormResponse[] = data.data.responses

			// console.log("unfilteredResponses: ", unfilteredResponses)
			const filteredResponses: Array<QuestionReponses> = filterResponses(unfilteredResponses, filterClause)

			console.log(filteredResponses)

			res.locals.responses = filteredResponses
			return next()
		}
		catch (error: any) {
			console.log(error)
		}
	}
}

const filterResponses = (responses: any, filters: FilterClauseType[]): [] => {
	// should take all returned responses and filter responses based on provided filters

	const filteredResponses = responses.filter((response: QuestionReponses) => {

		return filters.every((filter) => {
			// console.log("current filter: ", filter)
			const question: any = response.questions.find((q: any) =>
				q.id === filter.id)
			if (!question) return false;

			switch (filter.condition) {
				case "equals":
					return question.value === filter.value;

				case 'does_not_equal':
					return question.value !== filter.value;

				case 'greater_than':
					if (question.type === "DatePicker") {
						return new Date(question.value) > new Date(filter.value)
					} else if (question.type = "NumberInput") {
						return Number(question.value) > Number(filter.value)
					} else {
						return question.value > filter.value
					}

				case 'less_than':
					if (question.type === "DatePicker") {
						return new Date(question.value) < new Date(filter.value)
					} else if (question.type = "NumberInput") {
						return Number(question.value) < Number(filter.value)
					} else {
						return question.value < filter.value
					}

				default:
					return false
			}
		})
	})
	return filteredResponses;
}

export default controller