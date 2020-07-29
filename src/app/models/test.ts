// Author - Padmesh Donthu
// Stores the test details for a user
export class Test {
  userEmailID: string;
  mockTests: [
    {
      score: number;
      createdDate: Date;
      mockTestId: string;
    }
  ];
  verbalTests: [
    {
      score: number;
      createdDate: Date;
      verbalTestId: string;
    }
  ];
  quizTests: [
    {
      score: number;
      createdDate: Date;
      quizTestId: string;
    }
  ];
  quantTests: [
    {
      score: number;
      createdDate: Date;
      quantTestId: string;
    }
  ];
}
