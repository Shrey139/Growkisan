from datetime import datetime
from flask import Flask, request
from base64 import b64encode
from utils import c_predict, predict_image, fert_suggest
import wikipediaapi
import requests
import os
app = Flask(__name__)

if not os.getenv("APPID"):
    raise Exception("APPID not given!")


def make_request(city):
    # APPID = "22c1a18e08dabdcc8ea2ca7b6b27a5c4"
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "APPID": os.getenv("APPID")
    }
    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        return data, response.status_code
    else:
        return {"status": "failed!"}, response.status_code


@app.route("/crop-prediction", methods=["POST"])
def crop_prediction():
    N = request.json.get("nitrogen")
    P = request.json.get("phosphorus")
    K = request.json.get("potassium")
    ph = request.json.get("ph")
    rainfall = request.json.get("rainfall")
    data, status = make_request(request.json.get("city"))
    if status == 200:
        temp = data["main"]["temp"]
        humidity = data["main"]["humidity"]
    else:
        return data, status
    crop_name = c_predict(N, P, K, temp, humidity, ph, rainfall)

    wiki_page_id = {
        "mothbeans": "vigna_aconitifolia",
        "kidneybeans": "kidney_bean",
        "pigeonpeas": "pigeon_pea",
        "orange": "orange_(fruit)"
    }
    if crop_name in wiki_page_id:
        crop_name = wiki_page_id[crop_name]
    wiki = wikipediaapi.Wikipedia("en")
    page = wiki.page(crop_name)
    if not page.exists():
        content = "Not Found"
        url = ""
    else:
        content = page.summary
        url = page.fullurl
    return {
        "crop_name": crop_name,
        "content": content,
        "url": url,
    }, 200


@app.route("/diseases-identification", methods=["POST"])
def diseases_identification():
    file = request.files.get("image")  # file object
    disease_image = file.read()
    disease = predict_image(disease_image)

    wiki_page_id = {
        "Cercospora_leaf_spot Gray_leaf_spot": "corn_grey_leaf_spot",
        "Black_rot": "black_rot",
        "Corn_(maize)__Common_rust": "Puccinia_sorghi",
        "Northern_Leaf_Blight": "Northern_corn_leaf_blight",
        "Grape__Esca_(Black_Measles)": "Esca_(grape_disease)",
        "Orange__Haunglongbing_(Citrus_greening)": "Citrus_greening_disease",
        "Leaf_blight_(Isariopsis_Leaf_Spot)": "Isariopsis_clavispora",
        "Pepper,bell__Bacterial_spot": "leaf_spot",
        "Spider_mites Two-spotted_spider_mite": "tetranychus_urticae",
        "Leaf_Mold": "tomato_leaf_mold",
        "Septoria_leaf_spot": "Septoria_lycopersici",
        "Target_Spot": "Corynespora_cassiicola"
    }

    wiki = wikipediaapi.Wikipedia("en")
    d_name = disease.split("___")[-1]

    if not d_name in ["healthy", "Pepper,bell__healthy"]:
        if d_name in wiki_page_id:
            d_name = wiki_page_id[d_name]
        page = wiki.page(d_name.lower())
        if not page.exists():
            title = d_name
            content = "Not Found"
            url = ""
        else:
            title = page.title
            content = page.summary
            url = page.fullurl
    else:
        title = "Healthy Crop"
        content = "Crop is Healthy"
        url = ""
    return {
        "disease": title,
        "content": content,
        "url": url
    }, 200


@app.route("/fertilizer-prediction", methods=["POST"])
def fertilizer_prediction():

    crop_name = request.json.get("crop_type")
    N = request.json.get("nitrogen")
    P = request.json.get("phosphorus")
    K = request.json.get("potassium")

    suggestion = fert_suggest(crop_name, N, P, K)
    return suggestion, 200

if __name__ == "__main__":
    app.run(debug=True)