// Author - Padmesh Donthu
// This is a class which stores all the possible configurations for the questions which are shown in the UI
export class QuestionConfig {
  allowBack: boolean;
  autoMove: boolean; // if boolean; it will move to next question automatically when answered.
  duration: number; // indicates the time in which quiz needs to be completed. 0 means unlimited.
  pageSize: number;
  showClock: boolean;
  showPager: boolean;
  theme: string;

  constructor(data: any) {
    data = data || {};
    this.allowBack = data.allowBack;
    this.autoMove = data.autoMove;
    this.duration = data.duration;
    this.pageSize = data.pageSize;
    this.showClock = data.showClock;
    this.showPager = data.showPager;
  }
}
