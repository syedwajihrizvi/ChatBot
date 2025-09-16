import OpenAI from 'openai';
import { conversationRepository as convRepo } from '../repositories/conversation';

const client = new OpenAI({
   apiKey: process.env.OPENAI_KEY,
});

type ChatResponse = {
   id: string;
   output_text: string;
};

export const chatService = {
   sendMsgToAI: async (
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.3,
         max_output_tokens: 200,
         previous_response_id: convRepo.getLastResponseId(conversationId),
      });
      convRepo.setLastResponseId(conversationId, response.id);
      return { id: response.id, output_text: response.output_text };
   },
};
