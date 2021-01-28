import { Question } from './../shared/model/question.model';


export class QuizData {


    getQuestionWithOutAnswers(){
        let questions:Question[] = [];
        for(let q of this.questions){
            questions.push({"qid":q.qid,"qdata":q.qdata,"options":q.options,"ans":0});
        }
        return questions;
    }
    getAnswerKeys(){
        let keyMap:Map<number,number>=new Map();
        for(let q of this.questions){
            keyMap[q.qid] = q.ans;
        }
        return keyMap;
    }
    questions: Question[] = [
        {
            "qid": 1,
            "qdata": "Who is the fifth President of India?",
            "options": ["Zakhir", "Rajendra Prasad", "Fakhrudin Ali Ahmed", "Kalam"],
            "ans": 3
        },

        {
            "qid": 2,
            "qdata": "What is the capital of Delhi?",
            "options": ["Delhi", "Mumbai", "Nagpur", "Patna"],
            "ans": 1
        },

        {
            "qid": 3,
            "qdata": "ALU stands for?",
            "options": ["Arithmetic Logic Unit", "Appliction Logic Unit", "Array Logic Unit", "None above"],
            "ans": 1
        },

        {
            "qid": 4,
            "qdata": "Which is valid storage type?",
            "options": ["CPU", "Keyboard", "Pen Drive", "None above"],
            "ans": 3
        },

        {
            "qid": 5,
            "qdata": "How many states are there in India in 2020?",
            "options": ["26", "29", "27", "31"],
            "ans": 3
        },

        {
            "qid": 6,
            "qdata": "Who is the Vice -Captain of Indian Cricket Test Team?",
            "options": ["Pujara", "Rahane", "Pant", "Jadeja"],
            "ans": 2
        },

        {
            "qid": 7,
            "qdata": "Which is the smartphone to cross the clock speed of 3.1GHz?",
            "options": ["OnePlus", "Asus ROG", "Samsung", "Realme"],
            "ans": 2
        }, {
            "qid": 8,
            "qdata": "FFC stands for?",
            "options": ["Foreign Finance Corporation", "Film Finance Corporation", "Federation of Football Council", "None of the above"],
            "ans": 2
        },

        {
            "qid": 9,
            "qdata": "Where is IPL 2020 going to happen?",
            "options": ["India", "UAE", "Australia","None of the above"],
            "ans": 2
        }, {
            "qid": 10,
            "qdata": "Who has been appointed as the Comptroller and Auditor General (CAG) of India?",
            "options": ["G.C. Murmu", "Vinod Rai", "N K Singh", "Ranjan Gogoi"],
            "ans": 1
        }
    ]
}
