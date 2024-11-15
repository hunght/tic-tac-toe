import React, { useState, useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const TreeNode = memo(({ 
  node, 
  index, 
  parentId, 
  onDragEnd,
  onAdd, 
  onDelete, 
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.text);
  const [isExpanded, setIsExpanded] = useState(true);
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TREE_NODE',
    item: () => ({ id: node.id, index, parentId }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'TREE_NODE',
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.id === node.id) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragParentId = item.parentId;
      const dropParentId = parentId;

      // Prevent dropping a parent into its own child
      if (isChildOf(node, item.id)) return;

      // Don't allow dropping at the same position
      if (dragIndex === hoverIndex && dragParentId === dropParentId) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Define zones for dropping
      const upperZone = hoverBoundingRect.height * 0.25;
      const lowerZone = hoverBoundingRect.height * 0.75;

      // Determine drop position based on hover location
      if (hoverClientY < upperZone) {
        // Drop above
        item.index = hoverIndex;
        item.dropParentId = dropParentId;
      } else if (hoverClientY > lowerZone) {
        // Drop below
        item.index = hoverIndex + 1;
        item.dropParentId = dropParentId;
      } else {
        // Drop as child
        item.index = node.children?.length || 0;
        item.dropParentId = node.id;
      }
    },
    drop(item) {
      if (item.id === node.id) return;
      if (!item.dropParentId) return;
      
      onDragEnd(
        item.id,
        item.parentId,
        item.dropParentId,
        item.index,
        item.index
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Helper function to check if a node is a child of another node
  const isChildOf = (parentNode, childId) => {
    if (!parentNode.children) return false;
    return parentNode.children.some(child => 
      child.id === childId || isChildOf(child, childId)
    );
  };

  drag(drop(ref));

  const handleEdit = () => {
    if (isEditing) {
      onEdit(node.id, editValue);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditValue(node.text);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className={`pl-4 ${isDragging ? 'opacity-50' : ''}`}>
      <div
        ref={ref}
        className={`flex  items-center gap-2 p-2 rounded-lg mb-1
          ${isOver ? 'bg-blue-100' : 'bg-white'}
          hover:bg-gray-50 border border-gray-200`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-4 h-4 flex items-center justify-center"
        >
          {node.children?.length > 0 && (
            <span>{isExpanded ? '▼' : '▶'}</span>
          )}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleEdit}
            autoFocus
            className="flex-1 p-1 border rounded"
          />
        ) : (
          <span className="flex-1 text-black">{node.text}</span>
        )}

        <div className="flex gap-1">
          <button
            onClick={() => onAdd(node.id)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add child node"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleEdit}
            className="p-1 hover:bg-gray-100 rounded"
            title="Edit node"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Delete node"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && node.children && node.children.length > 0 && (
        <div className="pl-4">
          {node.children.map((childNode, childIndex) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              index={childIndex}
              parentId={node.id}
              onDragEnd={onDragEnd}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
