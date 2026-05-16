import pytesseract
from PIL import Image
import io


def extract_text(image_content):
    image = Image.open(io.BytesIO(image_content))

    text = pytesseract.image_to_string(image)

    return text