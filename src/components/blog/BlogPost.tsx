import React from 'react';
import { Download } from 'lucide-react';
import Button from '../ui/Button';
import { exportToPDF, exportToWord, exportToExcel } from '../../utils/export';

interface BlogPostProps {
  title: string;
  content: string;
  data: any;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, data }) => {
  return (
    <article className="prose dark:prose-invert max-w-none mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="text-gray-700 dark:text-gray-300 mb-6">{content}</div>
      
      <div className="flex gap-4">
        <Button
          onClick={() => exportToPDF(title, content, data)}
          variant="secondary"
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export PDF
        </Button>
        <Button
          onClick={() => exportToWord(title, content, data)}
          variant="secondary"
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export Word
        </Button>
        <Button
          onClick={() => exportToExcel(data)}
          variant="secondary"
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export Excel
        </Button>
      </div>
    </article>
  );
};

export default BlogPost;