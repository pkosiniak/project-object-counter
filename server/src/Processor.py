from typing import List
from math import floor
import io
from PIL import Image
from src.fnList import fnList, restricted
from src.ImageProcessor import ImageProcessor
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('Agg')


class Processor:
    def __init__(self):
        self.commandList = []
        pass

    def normalize(self, img: np.ndarray):
        return np.array(img * floor(255 / np.max(img)), np.uint8)

    def imread(self, img):
        self.img = Image.open(img)

    def rgb2gray(self):
        self.gray = np.array(self.img.convert('L'), np.uint8)
        self.lastImg = self.gray.copy()
        return self.gray

    def imhist(self, img=None):
        img = self.gray if img is None else np.array(img, np.uint8)
        fig = plt.figure()
        plt.hist(img.ravel(), bins=256, range=(0, 255), fc='k', ec='k')
        stream = io.BytesIO()
        plt.savefig(stream, format='png')
        plt.close(fig)
        stream.seek(0)
        self.histStream = stream

    def initImP(self):
        self.imp = ImageProcessor()

    def processorInit(self, img):
        self.imread(img)
        self.rgb2gray()
        self.initImP()

    def reduceCommands(self, commandList: List):
        reducedList = []
        lastRestricted = None
        for cmd in commandList:
            if cmd['command'] in restricted:
                lastRestricted = cmd
            else:
                reducedList.append(cmd)

        if lastRestricted:
            self.imp.imageObjects = []
            reducedList.append(lastRestricted)


        return (reducedList, reducedList != commandList)

    def fromLast(self, commandList):
        commandList, isReduced = self.reduceCommands(commandList)

        onlyLastCmd = False
        if isReduced and len(self.commandList) > 0 and self.commandList == commandList[:-1]:
            onlyLastCmd = True
        else:
            self.lastImg = self.gray.copy()
        self.commandList = commandList
        return (self.lastImg, onlyLastCmd)

    def applayFilter(self, fnName: str, img, args):
        if fnName not in fnList:
            return
        selectedFunction = getattr(self.imp, fnName)

        asStream = False
        res = selectedFunction(img, *args)
        return res if isinstance(res, tuple) else (res, asStream)

    def controler(self, commandList):
        if commandList == self.commandList:
            return self.normalize(self.lastImg)

        img, onlyLastCmd = self.fromLast(commandList)
        asStream = False

        if onlyLastCmd:
            cmd = self.commandList[-1]
            img, asStream = self.applayFilter(
                cmd['command'], img, cmd['args']
            )
        else:
            self.imp.objectCounter = 0
            self.imp.imageObjects = []
            for cmd in self.commandList:
                img, asStream = self.applayFilter(
                    cmd['command'], img, cmd['args']
                )
        if not asStream:
            self.lastImg = img
            return (self.normalize(img), False)
        else:
            return (img, True)
