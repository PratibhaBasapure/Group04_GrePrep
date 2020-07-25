import { Answers } from './answers';

// This class stores the list of questions and answers attempted by the user
export class UserAnswers {
  userId: String;
  questionAnswers: Answers[];
  testType: String;
}
