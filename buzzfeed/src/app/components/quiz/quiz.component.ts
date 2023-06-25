import { Component, Input, OnInit } from '@angular/core';
import quizzQuestions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {

  titleQuizz: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  // The answer only appears when the questionnaire is finished
  finished: boolean = false

  constructor() {}

  ngOnInit(): void {
    if (quizzQuestions) {
      this.finished = false;
      this.titleQuizz = quizzQuestions.title;

      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]

    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizzQuestions.results[
        finalAnswer as keyof typeof quizzQuestions.results]
    }
  }

  // Return the most frequently tagged item
  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length) {

          return previous

        } else { return current }
    })

    return result
  }
}
