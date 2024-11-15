import React from 'react';
import Tree from './Tree/Tree';

const DraggableTree = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-2xl font-bold">Draggable Tree</h2>
          <p className="text-gray-600">
            Create, edit, and organize nodes in a tree structure. Drag and drop nodes to rearrange them.
          </p>
        </div>
        <Tree />
      </div>
    </div>
  );
};

export default DraggableTree;
