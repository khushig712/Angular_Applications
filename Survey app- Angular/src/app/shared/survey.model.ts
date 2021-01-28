export interface Survey{
  "topicId":string;
  "topicName":string;
  "data":Data[];
}

export interface Data{
  "ref":string;
  "desc":string;
}
