#this is api that will do data fetch or data isert,update in mongo db
# intentionally I have made all elemnet names in mongodb collection lowercase because pymongo library allows "insert" with field name, 
# but mongo-driver for Golang always created elements in lowercase during insert. 
from pymongo import MongoClient
from flask import Flask, request, jsonify
import json
import bson
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
client = MongoClient("mongodb+srv://test_admin:test123@clusterjs-u8ha7.mongodb.net/library_db?retryWrites=true&w=majority")
db = client.library_db
records = db.book_records
output = []

@app.route('/books', methods=['GET'])
def get_all_books():
  output = []
  for r in records.find():
      output.append({'id':r['id'],'name':r['name'], 'author':r['author'],'authorEmail':r['authoremail'], 'published':r['published'], 'pages':r['pages'],'publisher':r['publisher'], 'isAvailable':r['isavailable'], 'category':r['category'],'bindType':r['bindtype'],'photoPath':r['photopath']})

  return jsonify(output)

@app.route('/books/<bookid>', methods=['GET'])
def get_a_book(bookid):
  output = []
  id = int(bookid)
  if id > 0:
    nCount = records.count_documents({'id' : id})
    if nCount > 0: 
      one_book = records.find_one({'id' : id})
      output = {'id':one_book['id'],'name':one_book['name'],'author':one_book['author'],'authorEmail':one_book['authoremail'],'published':one_book['published'], 'pages':one_book['pages'],'publisher':one_book['publisher'], 'isAvailable':one_book['isavailable'], 'category':one_book['category'],'bindType':one_book['bindtype'],'photoPath':one_book['photopath']}
    else:
      output = {'count':0,'id':None,'name':None,'author':None,'published':None, 'pages':None,'publisher':None, 'isAvailable':None, 'category':None,'bindType':None,'photoPath':None}
  else:
    output = {'count':0,'id':None,'name':None,'author':None,'published':None, 'pages':None,'publisher':None, 'isAvailable':None, 'category':None,'bindType':None,'photoPath':None}
  return jsonify(output)

@app.route('/books/create', methods=['POST'])
def add_a_book():
  # this can't be called from URL, I tested calling this from angular
  # to insert number in MongoDB => use bson.int64.Int64 so field will be created as Int64 in Mongodb
  id = request.json['id']
  name = request.json['name']
  author = request.json['author']
  authorEmail = request.json['authorEmail']
  published = request.json['published']
  pages = request.json['pages']
  publisher = request.json['publisher']
  isAvailable = request.json['isAvailable']
  category = request.json['category']
  bindType = request.json['bindType']
  photoPath = request.json['photoPath']

  book_id = records.insert({'id':bson.int64.Int64(id),'name':name,'author':author,'authoremail':authorEmail,'published':published,'pages':bson.int64.Int64(pages),'publisher':publisher,'isavailable':isAvailable,'category':category, 'bindtype':bindType, 'photopath':photoPath })
  new_book = records.find_one({'_id' : book_id})
  output = {'name':new_book['name'],'page':new_book['pages'],'published':new_book['published']}
  return jsonify({'result' : output})

@app.route('/books/update/<bookid>', methods=['PUT'])
def upd_a_book(bookid):
  id = int(bookid)
  if id > 0:
    dbResponse = records.update_one(
    {'id': id},
    {'$set': {'name': request.json['name'],
          'author': request.json['author'],
          'authoremail': request.json['authorEmail'],
          'published': request.json['published'],
          'pages': request.json['pages'],
          'publisher': request.json['publisher'],
          'isavailable': request.json['isAvailable'],
          'category': request.json['category'],
          'bindtype': request.json['bindType'],
          'photopath': request.json['photoPath']
        }
    }
    )
  new_book = records.find_one({'id' : id})
  output = {'name':new_book['name'],'page':new_book['pages'],'published':new_book['published']}
  return jsonify({'result' : output})

@app.route('/books/delete/<bookid>', methods=['DELETE'])
def del_a_book(bookid):
  id = int(bookid)
  if id > 0:
    myQuery ={'id':id} 
    records.delete_one(myQuery) 
  output = {'id':None,'name':None,'author':None,'authorEmail':None,'published':None, 'pages':None,'publisher':None, 'isAvailable':None, 'category':None,'bindType':None,'photoPath':None}
  return jsonify({'result' : output})

if __name__ == '__main__':
  app.run()

