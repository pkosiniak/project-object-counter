import io
from typing import List
from src.ImageProcessorBase import ImageProcessorBase
import numpy as np
from scipy.ndimage import label, measurements
import matplotlib.patches as patches
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')


class ImageProcessor(ImageProcessorBase):
    def __init__(self):
        self.imageObjects = []

# region COLOR GRAYSCALE
    def setColorGrayscaleObjects(self, img: np.ndarray):
        img, counter = label(img)

        if len(self.imageObjects) == 0:
            for i in range(counter):
                self.imageObjects.append({
                    'color': i + 1
                })
        return img

    def getColorGrayscaleObjects(self, img: np.ndarray):
        print('Coloring objects...')
        return self.setColorGrayscaleObjects(img)
# endregion COLOR GRAYSCALE

# region CENTER OF MASS
    def setObjectsCenterOfMass(self, img):
        lbl = self.requires(img, ['none'], 'gray')
        print('CENTER OF MASSES:')

        center = measurements.center_of_mass(img, lbl, np.unique(lbl)[1:])
        for index, obj in enumerate(self.imageObjects):
            obj['center'] = (int(center[index][1]), int(center[index][0]))
            print(index, (int(center[index][1]), int(center[index][0])))

    def getObjectsCenterOfMass(self, img):
        print('Calculating objects center of mass...')
        self.setObjectsCenterOfMass(img)
        ret = self.drawText(img, 'center')
        return ret

# endregion CENTER OF MASS

# region OBJECT PIXEL SIZES
    def setObjectsPixelSizes(self, img):
        lbl = self.requires(img, ['color', 'center'], 'gray')
        print('OBJECT PIXEL SIZES:')

        unique = np.unique(lbl)[1:]
        for index, imObject in enumerate(self.imageObjects):
            obj = lbl == unique[index]
            imObject['object'] = obj
            imObject['size'] = str(np.sum(obj))
            print(index, str(np.sum(obj)))

    def getObjectsPixelSizes(self, img):
        print('Getting objects sizes...')
        self.setObjectsPixelSizes(img)
        return self.drawText(img, 'size')

# endregion OBJECT PIXEL SIZES

# region COLOR RGB
    def setColorRGBObjects(self, img):
        img = self.requires(img, ['object'], 'gray')

        colors = np.array([[255, 0, 0],
                           [0, 255, 0],
                           [0, 0, 255],
                           [255, 255, 0],
                           [0, 255, 255],
                           [255, 0, 255],
                           [255, 127, 0],
                           [127, 255, 0],
                           [0, 255, 127],
                           [0, 127, 255],
                           [127, 0, 255],
                           [255, 0, 127]])
        x, y = img.shape
        out = np.zeros((x, y, 3))
        for index, obj in enumerate(self.imageObjects):
            colorIndex = index % len(colors)
            obj['rgb'] = colors[colorIndex]
            for i in range(3):
                out[:, :, i] += obj['object'] * colors[colorIndex, i]
        return out

    def getColorRGBObjects(self, img):
        return self.setColorRGBObjects(img)

# endregion COLOR RGB

# region OBJECT RECT
    def setObjectsRect(self, img):
        img = self.requires(img, ['color', 'object'], 'gray')

        for index, obj in enumerate(self.imageObjects):
            y, x = np.where(obj['object'])

            obj['rect'] = {
                'top': min(y),
                'right': max(x),
                'bottom': max(y),
                'left': min(x)
            }
            print(index, obj['rect'])
        return img

    def getObjectsRect(self, img):
        print('Getting objects rectangles...')
        return self.drawRect(self.setObjectsRect(img))

# endregion OBJECT RECT

# region DRAWING
    def drawRect(self, img: np.ndarray):

        def getGrayColor(obj, length):
            return (obj / length, obj / length, obj / length)

        fig, ax = plt.subplots(1)
        ax.imshow(img, 'gray')

        for index, obj in enumerate(self.imageObjects):
            rect = obj['rect']
            x, y = rect['left'], rect['top']
            width = rect['right'] - rect['left']
            height = rect['bottom'] - rect['top']
            color = getGrayColor(obj['color'], len(self.imageObjects) + 1)

            rect = patches.Rectangle(
                (x, y), width, height, linewidth=1, edgecolor=color, facecolor='none'
            )
            ax.add_patch(rect)

        stream = io.BytesIO()
        plt.savefig(stream, format='png')
        plt.close(fig)
        stream.seek(0)
        return (stream, True)

    def drawText(self, img: np.ndarray, text: str):
        fig = plt.figure()
        cmap = 'gray' if img.ndim == 2 else None
        plt.imshow(img, cmap)
        for index, obj in enumerate(self.imageObjects):
            point = obj['center']
            s = obj[text] if isinstance(
                obj[text], str) else '(' + str(obj[text][0]) + ' , ' + str(obj[text][1]) + ')'
            plt.text(point[0], point[1], '.' + s,
                     fontsize=12, style='normal', fontweight='bold', color='#FF0000' if img.ndim == 2 else '#7F7F7F')

        stream = io.BytesIO()
        plt.savefig(stream, format='png')
        plt.close(fig)
        stream.seek(0)
        return (stream, True)
# endregion DRAWING

        '''
        params: ['color', 'object', 'size', 'center', 'rect', 'none']
        imgType: ['original', 'gray', 'rgb', 'none']
        '''

    def requires(self, img, params: List[str], imgType: str):
        workImg = img.copy()
        grayImg = workImg
        rgbImg = workImg
        for param in params:
            if param == 'color' or param == 'none' or len(self.imageObjects) == 0:
                print('set Color Grayscale Objects')
                grayImg = self.setColorGrayscaleObjects(workImg)
            if param == 'center':
                if not 'center' in self.imageObjects[0]:
                    print('set Objects Center Of Mass')
                    self.setObjectsCenterOfMass(grayImg)
            if param == 'object' or param == 'size':
                if not 'object' in self.imageObjects[0] or not 'size' in self.imageObjects[0]:
                    print('set Objects Pixel Sizes')
                    self.setObjectsPixelSizes(grayImg)
            if param == 'rgb':
                if not 'rgb' in self.imageObjects[0]:
                    print('set Color RGB Objects')
                    rgbImg = self.setColorRGBObjects(grayImg)
            if param == 'rect':
                if not 'rect' in self.imageObjects[0]:
                    print('set Objects Rect')
                    self.setObjectsRect(grayImg)

        if imgType == 'original':
            return img
        if imgType == 'gray':
            return grayImg
        if imgType == 'rgb':
            return rgbImg
        return
