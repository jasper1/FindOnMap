#!/usr/bin/env python
# encoding: utf-8

from pymongo import Connection
from django.conf import settings
from apps.company.models import Company
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *argv, **options):
        print "PG2MG for companies"
        companies = Company.objects.all()
        connection = Connection(settings.MONGO_HOST, settings.MONGO_PORT)
        db = connection[settings.MONGO_DB]
        set_db = db['companies']
        
        for o in companies:
            if o.primary_office and len(o.name.strip())>0:
                c = {'name':o.name.strip(),
                     'lat':o.primary_office.latitude,
                     'lon':o.primary_office.longitude
                }
                set_db.insert(c)
                print o.name
