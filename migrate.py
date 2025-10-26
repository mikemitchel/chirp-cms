#!/usr/bin/env python3
import sqlite3
import json

def text_to_lexical(text):
    """Convert plain text to Lexical JSON format"""
    if not text:
        return None

    # Split by double newlines to get paragraphs
    paragraphs = text.split('\n\n')
    children = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Check if it's a heading (starts and ends with **)
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

        # Handle paragraphs with inline bold
        text_nodes = []
        parts = para.split('**')

        for i, part in enumerate(parts):
            if not part:
                continue
            # Odd indices are bold (between ** markers)
            is_bold = i % 2 == 1
            text_nodes.append({
                "type": "text",
                "text": part,
                "format": 1 if is_bold else 0,  # 1 = bold
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

# Get all content cards with plain text
cursor.execute("""
    SELECT id, content
    FROM pages_blocks_content_card
    WHERE typeof(content) = 'text' AND content NOT LIKE '{%'
""")

cards = cursor.fetchall()
print(f"Found {len(cards)} content cards to migrate")

# Update each card
for card_id, content in cards:
    lexical_content = text_to_lexical(content)
    if lexical_content:
        json_content = json.dumps(lexical_content)
        cursor.execute("""
            UPDATE pages_blocks_content_card
            SET content = ?
            WHERE id = ?
        """, (json_content, card_id))

conn.commit()
conn.close()

print("Migration complete!")
