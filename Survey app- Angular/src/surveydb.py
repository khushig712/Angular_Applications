import dbconfig

client=dbconfig.dbConnect()

db=client['surveydb']

def add_survey(survey):
    col=db['survey']
    col.insert_one(survey)
