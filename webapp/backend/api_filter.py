"""Sending the API request"""
import requests
import geopandas as gpd
from shapely.geometry import Point
from apikey import get_api_key

def api_request(city):
    """Getting the City from the Flask Server, returning the response from the API """
    api_key = get_api_key()
    if len(city) < 1:
        return 404
    response = requests.get(f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{city}?unitGroup=metric&include=days&key={api_key}&contentType=json", timeout=10)
    if response.status_code != 200:
        return 404
    dict_response = response.json()
    country = get_country_from_coordinates(dict_response["latitude"],dict_response["longitude"])
    return [dict_response, country]


world = gpd.read_file('./vectors/ne_10m_admin_0_countries_isr.shp')

def get_country_from_coordinates(lat, lon):
    """Getting Lat and Lon from the Flask server and returning the country of the city"""
    point = Point(lon, lat)
    for _, country in world.iterrows():
        if country['geometry'].contains(point):
            return country['ADMIN']
    return None
