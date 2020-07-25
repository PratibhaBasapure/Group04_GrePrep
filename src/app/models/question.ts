// A class which stores the list of questions that are available in the database
export class Question {
  _id: String;
  questionId: number;
  title: String;
  type: String;
  subType: String;
  image: String;
  answer: string[];
  options: String[];
  answered: boolean;
}
