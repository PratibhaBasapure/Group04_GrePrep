export class Question {
  _id: String;
  questionId: number;
  title: String;
  type: String;
  subType: String;
  image: String;
  answer: String[];
  options: String[];
  answered: boolean;
}
