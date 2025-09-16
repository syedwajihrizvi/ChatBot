export type ResponseMessage = {
   role: 'user' | 'bot';
   content: string;
};

type ChatInputForm = {
   prompt: string;
};
