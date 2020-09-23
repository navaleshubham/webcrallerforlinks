import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl
import sys
# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = sys.argv[1]
if(url[-1]!='/'):
    url=url+'/'
# url=url.encode()
# print(url)
html = urllib.request.urlopen(url, context=ctx).read()
soup = BeautifulSoup(html, 'html.parser')
# Retrieve all of the anchor tags
tags = soup('a')
current=[]
main=[]
final=set()
final.add(url)
for tag in tags:
    try:
        current.append(tag.get('href', None))
    except:
        continue
for i in current:
    try:
        if(i.find('/')==0):
            i=url+str(i[1:])
            main.append(i)
        elif(i.find('http')==0):
            main.append(i)
    except:
        continue
    
# print(main)
# looping through links present in main array
for i in main:
    # print(i)
    if(i in final):continue
    final.add(i)
    try:
        html = urllib.request.urlopen(i, context=ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        tags = soup('a')
        for tag in tags:
            j=tag.get('href', None)
            try:
                if(j.find('/')==0):
                    j=str(i)+str(j[1:])
                    final.add(j)
                elif(j.find('http')==0):
                    final.add(j)
                else:
                    final.add(j)
            except:continue
    except:continue

print(final)