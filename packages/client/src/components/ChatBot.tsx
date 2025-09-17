import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { TypingIndicator } from './TypingIndicator';
import { Message } from './Message';
import type { ChatInputForm, ResponseMessage } from '@/types';
import { ChatInput } from './ChatInput';
import notifaction from '../assets/sounds/notification.mp3';
import pop from '../assets/sounds/pop.mp3';

type OpenAIResponse = {
   response: {
      id: string;
      output_text: string;
   };
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<ResponseMessage[]>([]);
   const [error, setError] = useState<string | null>(null);
   const bottomRef = useRef<HTMLDivElement | null>(null);
   const [isWaiting, setIsWaiting] = useState(false);

   const notificationAudio = new Audio(notifaction);
   const popSoundAudio = new Audio(pop);
   notificationAudio.volume = 0.2;
   popSoundAudio.volume = 0.2;

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isWaiting]);

   const onSubmit = async ({ prompt }: ChatInputForm) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsWaiting(true);
      popSoundAudio.play();
      try {
         const data = await axios.post<OpenAIResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         const res = data.data;
         setMessages((prev) => [
            ...prev,
            { content: res.response.output_text, role: 'bot' },
         ]);
         setError(null);
         notificationAudio.play();
      } catch (error) {
         console.error(error);
         setError('Something went wrong. Please try again.');
      } finally {
         setIsWaiting(false);
      }
   };

   return (
      <div className="flex flex-col h-full w-full">
         <div className="flex flex-col gap-3 h-80 overflow-scroll scrollbar-hide scroll-auto">
            {messages &&
               messages.length > 0 &&
               messages.map((msg, index) => <Message key={index} msg={msg} />)}
            <div className="text-red-500">{error}</div>
            <div ref={bottomRef} />
            {isWaiting && <TypingIndicator />}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
