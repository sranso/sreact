/*
 * create a node tree
 *
 * node tree = [ string eltype, obj attributes, list children ]
 * children can be nodes (another tree) or strings/nums (leafs)
 */
const createNode = (elType, atts = {}, children = []) => {
  return [
    elType,
    atts,
    children
  ];
};


export default createNode;
