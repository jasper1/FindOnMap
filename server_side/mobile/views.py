#coding=utf-8

from common.decorators import json
from pymongo import Connection
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@json
def companies(request):
    query = request.GET.get('query',None)
    
    if not query:
        return []
    
    connection = Connection(settings.MONGO_HOST, settings.MONGO_PORT)
    db = connection[settings.MONGO_DB]
    
    set_db = db['companies']
    
    query = {
             'name':{'$regex':query},
            }
    
    ret = []
    
    for c in set_db.find(query).limit(20):
        ret.append({'n':c['name'], 'x':c['lat'], 'y':c['lon']})
    
    return ret