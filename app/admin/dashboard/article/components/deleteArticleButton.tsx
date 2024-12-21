import React from 'react';

interface DeleteArticleProps {
  articleId: string;
  onDelete: (id: string) => void;
}

const DeleteArticle: React.FC<DeleteArticleProps> = ({
  articleId,
  onDelete,
}) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      onDelete(articleId);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  );
};

export default DeleteArticle;
