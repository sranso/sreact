/*
 * render a node or simple textNode as html string
 * node -> HTML string
 */
const render = (node) => {
  if (typeof node === 'string') {
    return node;
  }
  if (node.length !== 3) {
    console.log(node);
    throw new Error('Please pass a valid node.');
  }

  const [elType, atts, children] = node;
  const attString = Object.keys(atts).map((att) => renderAtt(att, atts[att])).join(' ');
  return `<${elType} ${attString}>${children.map(render).join('\n')}</${elType}>`;
};

const renderAtt = (att, value) => {
  if (att === 'style') {
    return renderStyles(value);
  } else {
    return `${att}="${value}"`;
  }
};

const renderStyles = (stylesMap) => {
  const stylesString = Object.keys(stylesMap).map((key) => {
    return `${key}: ${stylesMap[key]}`;
  }).join('; ');
  return `style="${stylesString}"`;
};

export default render;
