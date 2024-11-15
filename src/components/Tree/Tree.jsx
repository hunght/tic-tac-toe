import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TreeNode from './TreeNode';
import { PlusIcon } from '@heroicons/react/24/outline';

const Tree = () => {
  const [treeData, setTreeData] = useState([
    {
      id: '1',
      text: 'Root',
      children: [
        {
          id: '2',
          text: 'Child 1',
          children: []
        },
        {
          id: '3',
          text: 'Child 2',
          children: []
        }
      ]
    }
  ]);

  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    // Initialize history with initial state
    if (history.length === 0) {
      setHistory([JSON.stringify(treeData)]);
      setCurrentIndex(0);
    }
  }, []);

  const saveState = useCallback((newState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    const newStateStr = JSON.stringify(newState);
    
    // Only save if the state has actually changed
    if (newHistory[newHistory.length - 1] !== newStateStr) {
      newHistory.push(newStateStr);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setTreeData(newState);
    }
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTreeData(JSON.parse(history[currentIndex - 1]));
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTreeData(JSON.parse(history[currentIndex + 1]));
    }
  }, [currentIndex, history]);

  const findNode = useCallback((nodes, id) => {
    for (let node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const removeNode = useCallback((nodes, id) => {
    return nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = removeNode(node.children, id);
      }
      return true;
    });
  }, []);

  const generateId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9);
  }, []);

  const handleAdd = useCallback((parentId) => {
    const newData = JSON.parse(JSON.stringify(treeData));
    const parent = parentId ? findNode(newData, parentId) : null;
    const newNode = {
      id: generateId(),
      text: 'New Node',
      children: []
    };

    if (parent) {
      parent.children.push(newNode);
    } else {
      newData.push(newNode);
    }

    saveState(newData);
  }, [treeData, findNode, generateId, saveState]);

  const handleDelete = useCallback((id) => {
    const newData = removeNode(JSON.parse(JSON.stringify(treeData)), id);
    saveState(newData);
  }, [treeData, removeNode, saveState]);

  const handleEdit = useCallback((id, newText) => {
    const newData = JSON.parse(JSON.stringify(treeData));
    const node = findNode(newData, id);
    if (node) {
      node.text = newText;
      saveState(newData);
    }
  }, [treeData, findNode, saveState]);

  const handleDragEnd = useCallback((dragId, dragParentId, dropParentId, dragIndex, hoverIndex) => {
    const newData = JSON.parse(JSON.stringify(treeData));

    try {
      // Find the dragged node and remove it from its current position
      const draggedNode = findNode(newData, dragId);
      if (!draggedNode) return;

      // Remove from old position
      let sourceParent = dragParentId ? findNode(newData, dragParentId) : { children: newData };
      if (!sourceParent) return;
      
      sourceParent.children = removeNode(sourceParent.children || [], dragId);

      // Add to new position
      let targetParent = dropParentId ? findNode(newData, dropParentId) : { children: newData };
      if (!targetParent) return;

      if (!targetParent.children) targetParent.children = [];
      
      // Ensure hoverIndex is within bounds
      const targetLength = targetParent.children.length;
      const safeHoverIndex = Math.max(0, Math.min(hoverIndex, targetLength));
      
      // Insert at the correct position
      targetParent.children.splice(safeHoverIndex, 0, draggedNode);

      // Update the state
      if (!dropParentId) {
        saveState(targetParent.children);
      } else {
        saveState(newData);
      }
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
    }
  }, [treeData, findNode, removeNode, saveState]);

  const exportToJson = useCallback(() => {
    const jsonString = JSON.stringify(treeData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tree-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [treeData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => handleAdd(null)}
            className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <PlusIcon className="w-4 h-4" />
            Add Root Node
          </button>
          <button
            onClick={undo}
            disabled={currentIndex <= 0}
            className={`px-3 py-2 rounded-lg ${
              currentIndex <= 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Undo
          </button>
          <button
            onClick={redo}
            disabled={currentIndex >= history.length - 1}
            className={`px-3 py-2 rounded-lg ${
              currentIndex >= history.length - 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Redo
          </button>
          <button
            onClick={exportToJson}
            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Export JSON
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          {treeData.map((node, index) => (
            <TreeNode
              key={node.id}
              node={node}
              index={index}
              parentId={null}
              onDragEnd={handleDragEnd}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Tree;
