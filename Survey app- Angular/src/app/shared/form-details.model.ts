export interface FormDetails{
  "name":string;
  "mobile":number;
  "org":string;
  "resp":string;
  "email":string;
  "answers":Answers[];
}

export interface Answers{
  "topicId":string;
  "ref":string;
  "section":number;
  "choice":string;
  // "comments":string;
}
