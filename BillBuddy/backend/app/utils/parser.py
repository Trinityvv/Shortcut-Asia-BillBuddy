import re


def clean_item_name(name):
    # remove quantity markers like 1x 2x
    name = re.sub(r"\b\d+x\s*", "", name)

    # remove "Items"
    name = re.sub(r"^Items\s*", "", name, flags=re.IGNORECASE)

    # remove numeric ranges like (411-418)
    name = re.sub(r"\(\d+\-\d+\)", "", name)

    # remove numeric codes like (417)
    name = re.sub(r"\(\d+\)", "", name)

    # remove OCR tags like (B)
    name = re.sub(r"\([A-Za-z]\)", "", name)

    # remove leftover numeric fragments like 313-315)
    name = re.sub(r"\d+\-\d+\)", "", name)

    # remove "Slice)"
    name = re.sub(r"Slice\)", "", name, flags=re.IGNORECASE)

    # remove dine-in text
    name = re.sub(r"Dine[\s-]?In", "", name, flags=re.IGNORECASE)

    # remove leading symbols/commas
    name = re.sub(r"^[^\w]+", "", name)

    # normalize spaces
    name = re.sub(r"\s+", " ", name)

    return name.strip()

def parse_receipt_items(text):
    items = []

    # flatten OCR text
    text = text.replace("\n", " ")

    pattern = r"(.+?)\sRM\s?(\d+\.\d{2})"

    matches = re.finditer(pattern, text)

    blacklist = [
        "subtotal",
        "tax",
        "total",
        "cash",
        "change",
    ]

    for match in matches:
        raw_name = match.group(1).strip()

        quantity_match = re.search(r"(\d+)x", raw_name)
        quantity = 1

        if quantity_match:
            quantity = int(quantity_match.group(1))

        name = clean_item_name(raw_name)

        if not name:
            continue

        if any(word in name.lower() for word in blacklist):
            continue

        price = float(match.group(2))
        unit_price = round(price / quantity, 2)

        items.append({
            "name": name,
            "quantity": quantity,
            "price": price,
            "unit_price": unit_price
        })

    return items
