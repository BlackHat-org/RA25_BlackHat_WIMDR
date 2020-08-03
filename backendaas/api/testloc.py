
import requests
def local(lng,lat):
    
    URL = "https://discover.search.hereapi.com/v1/discover"
    latitude = lat   #21.222707
    longitude = lng  #81.622747
    # api_key = apikey
    api_key = 'nX-LR_6Dp1xrJlBmm-tm2Vvldc4vy52r417TbJ_9x94' # Acquire from developer.here.com
    query = 'hospitals'
    limit = 5

    PARAMS = {
                'apikey':api_key,
                'q':query,
                'limit': limit,
                'at':'{},{}'.format(latitude,longitude)
             } 

    # sending get request and saving the response as response object 
    r = requests.get(url = URL, params = PARAMS) 
    data = r.json()
    # print(data)


    hospitalOne = data['items'][0]['title']
    hospitalOne_address =  data['items'][0]['address']['label']
    hospitalOne_latitude = data['items'][0]['position']['lat']
    hospitalOne_longitude = data['items'][0]['position']['lng']
    # hospitalOne_mobile = data['items'][0]['contacts'][0]["mobile"][0]["value"]
     

    hospitalTwo = data['items'][1]['title']
    hospitalTwo_address =  data['items'][1]['address']['label']
    hospitalTwo_latitude = data['items'][1]['position']['lat']
    hospitalTwo_longitude = data['items'][1]['position']['lng']
    # hospitalTwo_mobile = data['items'][1]['contacts'][0]["mobile"][0]["value"]


    hospitalThree = data['items'][2]['title']
    hospitalThree_address =  data['items'][2]['address']['label']
    hospitalThree_latitude = data['items'][2]['position']['lat']
    hospitalThree_longitude = data['items'][2]['position']['lng']


    hospitalFour = data['items'][3]['title']
    hospitalFour_address =  data['items'][3]['address']['label']
    hospitalFour_latitude = data['items'][3]['position']['lat']
    hospitalFour_longitude = data['items'][3]['position']['lng']
#     hospitalOne_mobile = data['items'][0]['contacts'][0]["mobile"][0]["value"]


    hospitalFive = data['items'][4]['title']
    hospitalFive_address =  data['items'][4]['address']['label']
    hospitalFive_latitude = data['items'][4]['position']['lat']
    hospitalFive_longitude = data['items'][4]['position']['lng']
    
#     print(hospitalOne_address)
    try:
        hospitalOne = data['items'][0]['title']
    except KeyError:
        hospitalOne = "none"
    
    try:
        hospitalOne_address =  data['items'][0]['address']['label']
    except KeyError:
        hospitalOne_address = "none"
    
    try:
        hospitalOne_mobile = data['items'][0]['contacts'][0]["mobile"][0]["value"]
    except KeyError:
        hospitalOne_mobile = "none"
    ######################################
    try:
        hospitalTwo = data['items'][1]['title']
    except KeyError:
        hospitalTwo = "none"
    
    try:
        hospitalTwo_address =  data['items'][1]['address']['label']
    except KeyError:
        hospitalTwo_address = "none"
    
    try:
        hospitalTwo_mobile = data['items'][1]['contacts'][0]["mobile"][0]["value"]
    except KeyError:
        hospitalTwo_mobile = "none"
        
    hos_one = [hospitalOne,hospitalOne_address,hospitalOne_mobile]
    hos_two = [hospitalTwo,hospitalTwo_address,hospitalTwo_mobile]
    
    return hos_one,hos_two
#     return data


def actual(lng,lat):

#     url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=21.222707%2C81.622747&lang=en-US"
    url= "https://revgeocode.search.hereapi.com/v1/revgeocode?at="+str(lat)+"%2C"+str(lng)+"&lang=en-US"

    payload = {}
    headers = {
      'Authorization': 'Bearer eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCIsImlzcyI6IkhFUkUiLCJhaWQiOiI0bXk2bGtWcmNieExEYjN1QkkySSIsImlhdCI6MTU5NjM1NDg3MCwiZXhwIjoxNTk2NDQxMjcwLCJraWQiOiJqMSJ9.ZXlKaGJHY2lPaUprYVhJaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuLk9ZT2VXQnZMSkZOWThhX0N6SEpjaXcuWkpscTlZNnFzR21MYjdXQ0pZd1VlbE4xVzgzRGx0VG9RS3Npd3ZGQ1lvNGljeDdHMU5OWmFOaVQyX3Mtd1hDV3l3eEhiQzN0bGxldlZmRFY5U1FTLW9ZZzg3ODhRdVk2eXFBcTM5Rkxxb1VPbW9zQS1lYzliMThqVFBCbzdPTEViN2d2bXZyZVNmLXI0STRsWHdrbkdnLldUbFNtd0NXVG1remZaUWhMS1NUSkc5WXM1Yml5WVVveGE3Q1ppZEQwenM.kCzzcIaA2xhLGgILvBd4hjr86S4WcN6VfQ9P1dOWE0UXyHDBaqnPtBjetqmcWDOC1uSPcEkT18w-NTbqTqAlyv05WWjzV2mNnwAnNcDpNRbWxYxfhinFfdNc1RMzZhaA3O4ffrpwvOKs4-CzmCVjpjkfzge3rcCDLymiH6w9b0ILHAnjuIvTNiNJnB90d_YPPf72GIGEeRjBnnyJLkNjjnc8Ivf8dLoGaPWc-Ex-m3VLbQIuzRZxZVqQT93CiomY5gvrykmmycAeJs98_NrM2NqWXMn6BJl5_W1HQNjBSlagojPn7SYd3aTAExR1v5l7D6WMPum46xFLPXOjixu6TA'
    }

    response = requests.request("GET", url, headers=headers, data = payload)
#     print(type(response)
    dic= response.json()
#     print(dic)
    # return dic
    return dic['items'][0]['title']


# d=actual(81.3418322,21.1562462)
# print(d)

    
# print(local(81.3418322,21.1562462))
# print(actual)