// Author - Padmesh Donthu
// A class which stores the list of questions that are available in the database
export class Question {
  _id: String;
  questionId: number;
  title: string;
  type: string;
  subType: string;
  image: string;
  answer: string[];
  options: string[];
  answered: boolean;
}
