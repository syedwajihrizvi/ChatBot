import type { ResponseMessage } from '@/types';
import ReactMarkdown from 'react-markdown';

export const Message = ({ msg }: { msg: ResponseMessage }) => {
   const copyToClipboard = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
      e.preventDefault();
      const selectedText = window.getSelection()?.toString().trim();
      return selectedText
         ? e.clipboardData &&
              e.clipboardData.setData('text/plain', selectedText)
         : null;
   };

   const renderMessageClass = (role: 'user' | 'bot') => {
      return role === 'user'
         ? 'self-end text-white bg-black rounded-full px-4 py-2 my-2 w-fit'
         : 'self-start text-left text-gray-800';
   };
   return (
      <p className={renderMessageClass(msg.role)} onCopy={copyToClipboard}>
         <ReactMarkdown>{msg.content}</ReactMarkdown>
      </p>
   );
};
