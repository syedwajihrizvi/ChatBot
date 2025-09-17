import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { conversationRepository as convRepo } from '../repositories/conversation';
import template from '../prompts/chatBot.txt';

const client = new OpenAI({
   apiKey: process.env.OPENAI_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);

const instructions = template.replace('{{parkInfo}}', parkInfo);

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
         instructions,
         input: prompt,
         temperature: 0.3,
         max_output_tokens: 200,
         previous_response_id: convRepo.getLastResponseId(conversationId),
      });
      convRepo.setLastResponseId(conversationId, response.id);
      return { id: response.id, output_text: response.output_text };
   },
};
