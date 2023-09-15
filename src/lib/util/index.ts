export function findNodeById(node, id) {
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const foundNode = findNodeById(child, id);
    if (foundNode) return foundNode;
  }
  return null;
}

export function findParentNodesById(tree, id) {
  let path = [];
  function recursiveSearch(node, id) {
    if (node.id === id) {
      path.push(node);
      return true;
    }
    if (node.children) {
      for (const child of node.children) {
        if (recursiveSearch(child, id)) {
          path.push(node);
          return true;
        }
      }
    }
    return false;
  }
  recursiveSearch(tree, id);
  return path.reverse();
}
