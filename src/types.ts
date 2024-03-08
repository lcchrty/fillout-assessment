import { RequestHandler } from 'express';

export type FilterClauseType = {
	id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}


type FormQuestions = {
	id: string,
	name: string,
	type?: "ShortAnswer" | "DatePicker",
	value: string
}

export type QuestionReponses = {
	questions: FormQuestions[],
	submissionId: string,
	submissionTime: string
}

export type FormResponse = {
	responses: QuestionReponses[],
	totalResponses: number,
	pageCount: number
}




