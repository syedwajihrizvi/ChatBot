const conversationHistory = new Map<string, string>();

export const conversationRepository = {
   getLastResponseId: (conversationId: string): string | undefined =>
      conversationHistory.get(conversationId),
   setLastResponseId: (conversationId: string, responseId: string): void => {
      conversationHistory.set(conversationId, responseId);
   },
};
