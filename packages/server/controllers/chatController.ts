import * as z from 'zod';
import type { Request, Response } from 'express';
import { chatService } from '../services/chatService';

const ChatBotRequest = z.object({
   prompt: z
      .string()
      .trim()
      .max(1000, 'Prompt is too long. Max 1000 characters.'),
   conversationId: z.string(),
});

// Public Interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const data = ChatBotRequest.safeParse(req.body);
      if (!data.success) {
         return res.status(400).json({ error: 'Invalid request data' });
      }
      try {
         const { prompt, conversationId } = data.data;
         const response = await chatService.sendMsgToAI(prompt, conversationId);
         res.json({ response });
      } catch (error) {
         res.status(500).json({ error: 'Failed to get response from OpenAI' });
      }
   },
};
