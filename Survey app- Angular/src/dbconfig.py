from pymongo import MongoClient

client = MongoClient("mongodb+srv://khushig999:khushigupta@heraizen-0308.rebyp.mongodb.net/test?retryWrites=true&w=majority")

def dbConnect():
    return client
