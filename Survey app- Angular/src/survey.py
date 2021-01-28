from flask import Flask,jsonify, render_template, url_for, request, session, redirect,make_response
from flask_restful import Api,Resource
from flask.json import JSONEncoder
import surveydb as dbs
from flask_pymongo import PyMongo
# from login import authenticate,identity
from flask_jwt import JWT, jwt_required,current_identity
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'app@123!'
# jwt = JWT(app,authenticate,identity)
api = Api(app)
CORS(app)

@app.route('/addSurvey',methods=["POST"])
def add_new_survey():
    survey=request.json
    # print(request.json)
    dbs.add_survey(survey)
    return "done"

admin=[{
'email':'admin@gmail.com',
'password':'admin123'
},{
'email':'survey@gmail.com',
'password':'survey123'
}]

@app.route('/login',methods=["POST"])
def login():
    print(request.json)
    for user in admin:
        if(user==request.json):
            # print(user)
            return user
    return make_response(jsonify({'error': 'Not found'}), 404)
