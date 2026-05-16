from fastapi import APIRouter, UploadFile, File
from app.utils.parser import parse_receipt_items
from app.services.ocr import extract_text

router = APIRouter()


@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...)):
    contents = await file.read()

    text = extract_text(contents)
    items = parse_receipt_items(text)

    return {
        "items": items
    }
