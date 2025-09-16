export const TypingIndicator = () => {
   return (
      <div className="flex gap-1 bg-white px-3 py-3 rounded-full w-fit">
         <div className="self-start w-2 h-2 rounded-full bg-black animate-pulse" />
         <div className="self-start w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:0.2s]" />
         <div className="self-start w-2 h-2 rounded-full bg-black animate-pulse [animation-delay:0.4s]" />
      </div>
   );
};
