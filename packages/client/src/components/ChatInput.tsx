import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { VscSend } from 'react-icons/vsc';
import type { ChatInputForm } from '@/types';

export const ChatInput = ({
   onSubmit,
}: {
   onSubmit: (data: ChatInputForm) => void;
}) => {
   const { register, handleSubmit, reset, formState } =
      useForm<ChatInputForm>();
   const onEnter = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         handleSubmit(handleFormSubmit)();
         e.preventDefault();
      }
   };

   const handleFormSubmit = (data: ChatInputForm) => {
      reset();
      onSubmit(data);
   };

   return (
      <form
         onSubmit={handleSubmit(handleFormSubmit)}
         onKeyDown={onEnter}
         className="flex flex-col items-end w-full gap-4 p-4 bg-white border rounded-lg shadow"
      >
         <textarea
            {...register('prompt', {
               required: true,
               maxLength: 1000,
               validate: (v) => v.trim().length > 0,
            })}
            className="w-full border-0 focus:outline-0 p-2 resize-none"
            placeholder="Ask me anything..."
            maxLength={1000}
         />
         <Button
            disabled={!formState.isValid}
            className="rounded-full w-9 h-9 flex items-center justify-center cursor-pointer"
         >
            <VscSend />
         </Button>
      </form>
   );
};
