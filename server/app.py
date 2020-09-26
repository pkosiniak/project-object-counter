import io
import os
from math import floor
from src.Processor import Processor
from flask import Flask, request, Response, json, jsonify
from flask_cors import CORS
from flask.helpers import send_file, send_from_directory
from PIL import Image

app = Flask(__name__, static_folder='../app/build') 
CORS(app)

proc = Processor()

def imgArray2stream(imgArr):
    out = Image.fromarray(imgArr)
    stream = io.BytesIO()
    out.save(stream, 'PNG')
    stream.seek(0)
    return stream


@app.route('/')
def hello_world():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    """static folder serve"""
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)

@app.route('/filters', methods=["GET"])
def filters():
    return send_file('filterList.json', mimetype='application/json')


@app.route('/upload', methods=["POST"])
def upload():
    file = request.files['image']
    proc.processorInit(file.stream)
    stream = imgArray2stream(proc.gray)
    return Response(stream.read(), mimetype='image/PNG')


@app.route('/image-size', methods=["GET"])
def imageSize():
    x, y = proc.img.size
    sizes = {
        'x': x,
        'y': y,
        'maxFilterRange': floor(x/2) * floor(y/2) 
    }
    return jsonify({'sizes': sizes})


@app.route('/histogram', methods=["GET"])
def histogram():
    proc.imhist()
    return Response(proc.histStream.read(), mimetype='image/PNG')


@app.route('/processor', methods=["POST"])
def processor():
    commands = request.get_json()
    result, asStream = proc.controller(commands['commandList'])
    if not asStream:
        result = imgArray2stream(result)
    return Response(result.read(), mimetype='image/PNG')
