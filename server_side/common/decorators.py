# coding: utf-8

from django.utils import simplejson
from django.utils.safestring import mark_safe
from django.http import HttpResponse
 
def json(f):
    """
        Декоратор, отдающий HttpResponse, содержащий JSON. 
        Если декорируемая функция возвращает HttpResponse, он отдается без изменений.
        В случае исключения оно также отдается в виде json.
    """
    def _decorator(request, *args, **kwargs):
        try:
            data = f(request, *args, **kwargs)
            if isinstance(data, HttpResponse):
                response = data
            else:
                json_content = mark_safe(simplejson.dumps(data, ensure_ascii=False ))
                response = HttpResponse(json_content, 'application/json')
        except Exception, e:
            json_content = simplejson.dumps({"error": unicode(e)}, ensure_ascii=False)
            response = HttpResponse(json_content, 'application/json')
        return response
    return _decorator