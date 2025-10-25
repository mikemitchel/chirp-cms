// Migration script to convert plain text content to Lexical format
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'payload.db'));

// Function to convert plain text to Lexical JSON format
function textToLexical(text) {
  if (!text) return null;

  // Split by double newlines to get paragraphs
  const paragraphs = text.split('\n\n');

  const children = paragraphs.map(para => {
    // Check if it's a heading (starts with **)
    if (para.trim().startsWith('**') && para.trim().endsWith('**')) {
      const headingText = para.trim().slice(2, -2);
      return {
        type: 'heading',
        tag: 'h3',
        children: [
          {
            type: 'text',
            text: headingText,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      };
    }

    // Check if it's a list item (starts with number or bullet)
    const listMatch = para.match(/^(\d+\.|\•)\s+(.+)/);
    if (listMatch) {
      return {
        type: 'listitem',
        children: [
          {
            type: 'text',
            text: listMatch[2],
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        value: listMatch[1].startsWith('•') ? undefined : parseInt(listMatch[1])
      };
    }

    // Regular paragraph - handle inline formatting
    const textNodes = [];
    let currentText = para;

    // Simple bold handling (**text**)
    const boldRegex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(para)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        textNodes.push({
          type: 'text',
          text: para.slice(lastIndex, match.index),
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
          version: 1
        });
      }

      // Add bold text
      textNodes.push({
        type: 'text',
        text: match[1],
        format: 1, // bold
        detail: 0,
        mode: 'normal',
        style: '',
        version: 1
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < para.length) {
      textNodes.push({
        type: 'text',
        text: para.slice(lastIndex),
        format: 0,
        detail: 0,
        mode: 'normal',
        style: '',
        version: 1
      });
    }

    // If no formatting found, just use the plain text
    if (textNodes.length === 0) {
      textNodes.push({
        type: 'text',
        text: para,
        format: 0,
        detail: 0,
        mode: 'normal',
        style: '',
        version: 1
      });
    }

    return {
      type: 'paragraph',
      children: textNodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    };
  });

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    }
  };
}

// Get all content cards with plain text
const cards = db.prepare(`
  SELECT id, content
  FROM pages_blocks_content_card
  WHERE typeof(content) = 'text' AND content NOT LIKE '{%'
`).all();

console.log(`Found ${cards.length} content cards to migrate`);

// Update each card
const updateStmt = db.prepare(`
  UPDATE pages_blocks_content_card
  SET content = ?
  WHERE id = ?
`);

const updateMany = db.transaction((cards) => {
  for (const card of cards) {
    const lexicalContent = textToLexical(card.content);
    updateStmt.run(JSON.stringify(lexicalContent), card.id);
  }
});

updateMany(cards);

console.log('Migration complete!');
db.close();
