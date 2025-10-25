#!/usr/bin/env python3
import sqlite3
import json
import uuid

# The content for the car donation page
content_text = """If you have an old car, truck, motorcycle, or boat that you no longer want, we hope you'll consider donating it to CHIRP. Our vehicle donation program is simple and quick, and makes a real difference for us! Towing and title transfer are provided, and you get a tax deduction for your generosity. Your vehicle doesn't even have to run! All you have to do to arrange a donation is call 844-48-CHIRP (844-482-4477) or fill out this form.

Here are a some answers to the questions you may have:

**What types of vehicles do you accept?**

Most cars, trucks, trailers, boats, RV's, motorcycles, off road vehicles, heavy equipment and other motorized vehicles are accepted.

**Does my car have to be running to donate it?**

We can take your vehicle running or not. However, it must be in one piece, have an engine, and be towable. Contact our CARS representative at 844-482-4477 to find out if your vehicle qualifies for pick-up.

**How quickly can I get my vehicle picked up?**

You will be contacted within 24 hours to start the donation process. After the donation record has been created, we will reach out to you within 2 to 3 business days to schedule your pick up. If you need your vehicle picked up sooner, please call us toll-free at 844-482-4477 as we may be able to make those arrangements.

**Do I need a smog certificate in order to donate my car?**

For states that require smog certificates or safety inspections, you may donate your vehicle without these documents.

**Do I need the title to donate my vehicle?**

You will need the title to the vehicle. If you do not have it, it is possible that other arrangements can be made. Please call us toll-free at 844-482-4477 seven days a week, for more information.

**What do you do with donated vehicles?**

Donated vehicles are taken to one of the sale locations our partner company has throughout the country, where they evaluate each vehicle and make major and/or minor mechanical repairs when it is cost effective. In most circumstances, they use auction houses to sell the donated vehicles. For unique or specialty items that have been donated, we may use other means to sell the vehicle to help ensure the maximum amount of money is received for such a donation.

**Why Donate?**

There are several great reasons, like:

1. You don't want to worry about selling your vehicle.
2. It is too expensive to repair your vehicle.
3. You don't trust your car to be safe on the road.
4. You need a tax write-off.

But the most important reason is that your donation will help CHIRP Radio stay strong and continue to improve and its expand its programming!"""

def text_to_lexical(text):
    """Convert plain text to Lexical JSON format"""
    paragraphs = text.split('\n\n')
    children = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Check if it's a heading
        if para.startswith('**') and para.endswith('**'):
            heading_text = para[2:-2]
            children.append({
                "type": "heading",
                "tag": "h3",
                "children": [{
                    "type": "text",
                    "text": heading_text,
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                }],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
            })
            continue

        # Check if it's a numbered list
        if para[0].isdigit() and para[1:3] == '. ':
            lines = para.split('\n')
            list_children = []
            for line in lines:
                if line and line[0].isdigit():
                    text = line.split('. ', 1)[1] if '. ' in line else line
                    list_children.append({
                        "type": "listitem",
                        "children": [{
                            "type": "text",
                            "text": text,
                            "format": 0,
                            "detail": 0,
                            "mode": "normal",
                            "style": "",
                            "version": 1
                        }],
                        "direction": "ltr",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "value": int(line[0])
                    })

            children.append({
                "type": "list",
                "listType": "number",
                "start": 1,
                "tag": "ol",
                "children": list_children,
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
            })
            continue

        # Handle paragraphs with inline bold
        text_nodes = []
        parts = para.split('**')

        for i, part in enumerate(parts):
            if not part:
                continue
            is_bold = i % 2 == 1
            text_nodes.append({
                "type": "text",
                "text": part,
                "format": 1 if is_bold else 0,
                "detail": 0,
                "mode": "normal",
                "style": "",
                "version": 1
            })

        if text_nodes:
            children.append({
                "type": "paragraph",
                "children": text_nodes,
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
            })

    return {
        "root": {
            "type": "root",
            "children": children,
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
        }
    }

# Connect to database
conn = sqlite3.connect('payload.db')
cursor = conn.cursor()

# Generate UUID for the block
block_id = str(uuid.uuid4())

# Convert content to Lexical
lexical_content = text_to_lexical(content_text)
json_content = json.dumps(lexical_content)

# Insert the content card
cursor.execute("""
    INSERT INTO pages_blocks_content_card (
        _order, _parent_id, _path, id,
        preheader, title, title_tag, content,
        image_position, background_image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", (
    1, 9, 'layout', block_id,
    'Donate to CHIRP',
    'Donating a Vehicle to CHIRP is Easy',
    'h1',
    json_content,
    'right',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop'
))

conn.commit()
conn.close()

print(f"Added content card to Car Donation page with ID: {block_id}")
