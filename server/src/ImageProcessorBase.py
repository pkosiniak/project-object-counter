from scipy.ndimage.morphology import binary_erosion, binary_dilation, binary_closing, binary_opening
from skimage.morphology import remove_small_objects, remove_small_holes, flood_fill
import cv2
import numpy as np


class ImageProcessorBase:

    def gray2bin(self, img: np.ndarray, low: int = 127, high: int = 255):
        print('Graysclae to binary conversion...')
        if low > high:
            low, high = high, low
        img = np.logical_or(img < low, img > high, dtype=np.uint8)
        return img

    def inverse(self, img: np.ndarray, inPlace=False):
        print('Image binary inversion...')
        out = img if inPlace else img.copy()
        out = np.array(np.logical_not(out), np.uint8)
        return out

    getInverse = inverse

    def imDilate(self, img=None, structElementSize=1, iterations=1):
        print('Image dilatation...')
        return binary_dilation(
            img, self.structElement(structElementSize), iterations=iterations
        )

    def imErode(self, img=None, structElementSize=1, iterations=1):
        print('Image erosion...')
        return binary_erosion(
            img, self.structElement(structElementSize), iterations=iterations
        )

    def imOpen(self, img=None, structElementSize=1,  iterations=1):
        print('Image opening...')
        return binary_opening(img, self.structElement(structElementSize), iterations=iterations)


    def imClose(self, img=None, structElementSize=1, iterations=1):
        print('Image closing...')
        se = self.structElement(structElementSize)
        return binary_closing(img, self.structElement(structElementSize), iterations=iterations)

    def structElement(self, structElementSize=1):
        return cv2.getStructuringElement(
            cv2.MORPH_ELLIPSE, (structElementSize*2+1, structElementSize*2+1)
        )

    def removeSmallObjects(self, img, minSize=64):
        print('Removing smallest objects...')
        img = np.array(img, np.bool)
        remove_small_objects(img, minSize, in_place=True)
        return img

    def removeSmallHoles(self, img, areaThreshold=64):
        print('Removing smallest holes...')
        img = np.array(img, np.bool)
        remove_small_holes(img, areaThreshold, in_place=True)
        return img

    def removeAllHoles(self, img: np.ndarray, x: int = 0, y: int = 0):
        print('fill in empty spaces in objects...')
        tmp = np.array(img, np.uint8)
        original = tmp.copy()
        flood_fill(tmp, (x, y), 1, inplace=True)
        tmp = self.getInverse(tmp)
        return np.logical_or(tmp, original)

    # TODO: this
    # def combineImageAndFilter(self, img: np.ndarray, mask: np.ndarray):
