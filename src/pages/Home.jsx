
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   BsSearch, BsThreeDotsVertical, BsEmojiSmile, 
//   BsPaperclip, BsSendFill, BsTelephone, BsInfoCircle,
//   BsHammer, BsCheck2All, BsPlusLg
// } from 'react-icons/bs';
// import { FaRegUserCircle } from "react-icons/fa";

// // --- Initial Data Structure ---
// const DUMMY_CHATS = [
//   { id: 1, name: "Arif Rahaman", status: "online", avatar: "https://i.pravatar.cc/150?u=1" },
//   { id: 2, name: "Sarah Kabir", status: "offline", avatar: "https://i.pravatar.cc/150?u=2" },
//   { id: 3, name: "Tanvir Hasan", status: "online", avatar: "https://i.pravatar.cc/150?u=3" },
// ];

// const INITIAL_THREADS = {
//   1: [
//     { id: 101, text: "Is the engine original?", sender: "receiver", time: "10:30 AM", type: "text" },
//     { id: 102, text: "Yes, 100% stock.", sender: "sender", time: "10:32 AM", type: "text" },
//   ],
//   2: [
//     { id: 201, text: "12,50,000", sender: "receiver", time: "09:15 AM", type: "bid" },
//   ],
//   3: [
//     { id: 301, text: "Check the documents please.", sender: "receiver", time: "Yesterday", type: "text" },
//   ]
// };

// export default function PremiumAuctionChat() {
//   const [activeChat, setActiveChat] = useState(DUMMY_CHATS[0]);
//   // Store all conversations in one state object keyed by User ID
//   const [allMessages, setAllMessages] = useState(INITIAL_THREADS);
//   const [input, setInput] = useState("");
//   const scrollRef = useRef(null);

//   // Auto-scroll whenever the active chat or message list changes
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeChat.id, allMessages]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const isBid = /^\d+$/.test(input.replace(/[৳,]/g, ''));
//     const newMessage = {
//       id: Date.now(),
//       text: input,
//       sender: "sender",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: isBid ? "bid" : "text"
//     };

//     // Update only the specific thread for the active user
//     setAllMessages(prev => ({
//       ...prev,
//       [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
//     }));
    
//     setInput("");
//   };

//   // Helper to get the last message for the sidebar preview
//   const getLastMsg = (userId) => {
//     const thread = allMessages[userId];
//     if (!thread || thread.length === 0) return "Start a conversation";
//     const last = thread[thread.length - 1];
//     return last.type === 'bid' ? `💰 Bid: ${last.text}` : last.text;
//   };

//   return (
//     <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      
//       {/* --- Sidebar --- */}
//       <div className="hidden md:flex flex-col w-80 lg:w-96 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800">
//         <div className="p-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"><FaRegUserCircle className='h-12 w-12 text-lime-200'  /></h1>
//           <button className="p-2 hover:bg-slate-800 rounded-full transition-colors"><BsPlusLg className="text-indigo-400" /></button>
//         </div>

//         <div className="px-6 mb-4">
//           <div className="relative group">
//             <BsSearch className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400" />
//             <input type="text" placeholder="Search bidders..." className="w-full bg-slate-800/50 border border-slate-700 py-2.5 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto px-3 space-y-2">
//           {DUMMY_CHATS.map((chat) => (
//             <div 
//               key={chat.id}
//               onClick={() => setActiveChat(chat)}
//               className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
//                 activeChat.id === chat.id 
//                 ? 'bg-indigo-600/20 border border-indigo-500/40 shadow-lg' 
//                 : 'hover:bg-slate-800/40 border border-transparent'
//               }`}
//             >
//               <div className="relative">
//                 <img src={chat.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover" />
//                 {chat.status === 'online' && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>}
//               </div>
//               <div className="ml-4 flex-1">
//                 <div className="flex justify-between items-center">
//                   <h3 className={`font-semibold ${activeChat.id === chat.id ? 'text-indigo-300' : 'text-slate-200'}`}>{chat.name}</h3>
//                 </div>
//                 <p className="text-sm text-slate-500 truncate font-light italic">
//                   {getLastMsg(chat.id)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- Dynamic Chat Window --- */}
//       <div className="flex-1 flex flex-col bg-[#0b0f1a] relative">
//         <header className="h-20 flex justify-between items-center px-8 bg-slate-900/30 backdrop-blur-md border-b border-slate-800 z-20">
//           <div className="flex items-center gap-4">
//             <img src={activeChat.avatar} alt="active" className="w-10 h-10 rounded-xl ring-2 ring-indigo-500/20" />
//             <div>
//               <h2 className="text-lg font-bold text-white leading-none mb-1">{activeChat.name}</h2>
//               <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{activeChat.status}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-6 text-slate-400">
//             <BsTelephone className="cursor-pointer hover:text-indigo-400" />
//             <BsInfoCircle className="cursor-pointer hover:text-indigo-400" />
//             <BsThreeDotsVertical className="cursor-pointer hover:text-indigo-400" />
//           </div>
//         </header>

//         {/* Message area renders based on activeChat.id */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-6 z-10 custom-scrollbar">
//           {(allMessages[activeChat.id] || []).map((msg) => (
//             <div key={msg.id} className={`flex ${msg.sender === 'sender' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-xl ${
//                 msg.type === 'bid'
//                   ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/5 border border-amber-500/50'
//                   : msg.sender === 'sender' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
//               }`}>
//                 {msg.type === 'bid' && (
//                   <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-amber-500 uppercase"><BsHammer /> Bid</div>
//                 )}
//                 <p className={msg.type === 'bid' ? 'text-xl font-black text-amber-400 italic' : 'text-sm'}>
//                   {msg.type === 'bid' ? `৳ ${msg.text}` : msg.text}
//                 </p>
//                 <div className="flex items-center justify-end gap-1 mt-1 opacity-50 text-[10px]">
//                   {msg.time} {msg.sender === 'sender' && <BsCheck2All className="text-cyan-400" />}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={scrollRef} />
//         </div>

//         <footer className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 z-20">
//           <form onSubmit={handleSend} className="max-w-5xl mx-auto flex items-center gap-4">
//             <div className="flex gap-1">
//               <button type="button" className="p-3 text-slate-400 hover:text-indigo-400"><BsPaperclip size={20} /></button>
//               <button type="button" className="p-3 text-slate-400 hover:text-indigo-400"><BsEmojiSmile size={20} /></button>
//             </div>
//             <input 
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type message..." 
//               className="flex-1 bg-slate-800/80 border border-slate-700 px-6 py-3 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
//             />
//             <button type="submit" className="bg-indigo-600 p-4 rounded-2xl text-white hover:bg-indigo-500 shadow-lg active:scale-95">
//               <BsSendFill size={18} />
//             </button>
//           </form>
//         </footer>
//       </div>
//     </div>
//   );
// }














// -------------------------------------New Code Below-------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { 
  BsSearch, BsThreeDotsVertical, BsEmojiSmile, 
  BsPaperclip, BsSendFill, BsTelephone, BsInfoCircle,
  BsHammer, BsCheck2All, BsPlusLg, BsX, BsChevronDown, BsChevronUp
} from 'react-icons/bs';
import { FaRegUserCircle } from "react-icons/fa";
import navImg from '../assets/images/navLogo.png'

// --- Initial Data Structure ---
const DUMMY_CHATS = [
  { id: 1, name: "Arif Rahaman", status: "online", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sarah Kabir", status: "offline", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Tanvir Hasan", status: "online", avatar: "https://i.pravatar.cc/150?u=3" },
];

const INITIAL_THREADS = {
  1: [
    { id: 101, text: "Is the engine original?", sender: "receiver", time: "10:30 AM", type: "text" },
    { id: 102, text: "Yes, 100% stock.", sender: "sender", time: "10:32 AM", type: "text" },
    { id: 103, text: "1250000", sender: "receiver", time: "10:35 AM", type: "bid" },
  ],
  2: [
    { id: 201, text: "12,50,000", sender: "receiver", time: "09:15 AM", type: "bid" },
  ],
  3: [
    { id: 301, text: "Check the documents please.", sender: "receiver", time: "Yesterday", type: "text" },
  ]
};

// Bid presets for quick bidding
const BID_PRESETS = [
  { value: 100000, label: "1 Lakh" },
  { value: 500000, label: "5 Lakh" },
  { value: 1000000, label: "10 Lakh" },
  { value: 1500000, label: "15 Lakh" },
];

export default function PremiumAuctionChat() {
  const [activeChat, setActiveChat] = useState(DUMMY_CHATS[0]);
  const [allMessages, setAllMessages] = useState(INITIAL_THREADS);
  const [input, setInput] = useState("");
  const [bidInput, setBidInput] = useState("");
  const [showBidSection, setShowBidSection] = useState(false);
  const [currentBid, setCurrentBid] = useState(1250000); // Current highest bid
  const [isBidSectionMinimized, setIsBidSectionMinimized] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll whenever the active chat or message list changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.id, allMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "sender",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setAllMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));
    
    setInput("");
  };

  const handleBid = () => {
    if (!bidInput.trim() || isNaN(bidInput)) return;
    
    const bidAmount = parseInt(bidInput.replace(/,/g, ''));
    
   

    const newBid = {
      id: Date.now(),
      text: bidAmount.toString(),
      sender: "sender",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "bid"
    };

    setAllMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newBid]
    }));

    setCurrentBid(bidAmount);
    setBidInput("");
    setShowBidSection(false);
  };

  const handlePresetBid = (amount) => {
    setBidInput(amount.toString());
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const getLastMsg = (userId) => {
    const thread = allMessages[userId];
    if (!thread || thread.length === 0) return "Start a conversation";
    const last = thread[thread.length - 1];
    return last.type === 'bid' ? `💰 Bid: ৳${formatCurrency(last.text)}` : last.text;
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      
      {/* --- Sidebar --- */}
      <div className="hidden md:flex flex-col w-80 lg:w-96 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800">
        <div className="p-6 flex justify-between items-center">
          <h1 className=" flex items-center justify-items-center gap-8 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            <FaRegUserCircle className='h-12 w-12 text-lime-200' />
            <img 
            className='h-15 w-50'
            src={navImg} alt="BID BAJ" />
          </h1>
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <BsPlusLg className="text-indigo-400" />
          </button>
        </div>

        <div className="px-6 mb-4">
          <div className="relative group">
            <BsSearch className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400" />
            <input 
              type="text" 
              placeholder="Search bidders..." 
              className="w-full bg-slate-800/50 border border-slate-700 py-2.5 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {DUMMY_CHATS.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeChat.id === chat.id 
                ? 'bg-indigo-600/20 border border-indigo-500/40 shadow-lg' 
                : 'hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <div className="relative">
                <img src={chat.avatar} alt="avatar" className="w-12 h-12 rounded-xl object-cover" />
                {chat.status === 'online' && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className={`font-semibold ${activeChat.id === chat.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                    {chat.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 truncate font-light italic">
                  {getLastMsg(chat.id)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Dynamic Chat Window --- */}
      <div className="flex-1 flex flex-col bg-[#0b0f1a] relative">
        <header className="h-20 flex justify-between items-center px-4 md:px-8 bg-slate-900/30 backdrop-blur-md border-b border-slate-800 z-20">
          <div className="flex items-center gap-3 md:gap-4">
            <img src={activeChat.avatar} alt="active" className="w-10 h-10 rounded-xl ring-2 ring-indigo-500/20" />
            <div>
              <h2 className="text-lg font-bold text-white leading-none mb-1">{activeChat.name}</h2>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{activeChat.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-slate-400">
            <BsTelephone className="cursor-pointer hover:text-indigo-400" />
            <BsInfoCircle className="cursor-pointer hover:text-indigo-400" />
            <BsThreeDotsVertical className="cursor-pointer hover:text-indigo-400" />
          </div>
        </header>

        {/* Toggleable Bid Section */}
        {showBidSection && (
          <div className={`${isBidSectionMinimized ? 'h-14' : 'h-auto'} bg-gradient-to-r from-amber-900/10 to-yellow-900/5 border-y border-amber-500/20 transition-all duration-300`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <BsHammer className="text-amber-400 text-lg" />
                <div>
                  <h3 className="font-bold text-amber-300">Place Your Bid</h3>
                  {!isBidSectionMinimized && (
                    <p className="text-xs text-amber-500/70">Current highest bid: ৳{formatCurrency(currentBid)}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBidSectionMinimized(!isBidSectionMinimized)}
                  className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg"
                >
                  {isBidSectionMinimized ? <BsChevronDown /> : <BsChevronUp />}
                </button>
                <button
                  onClick={() => setShowBidSection(false)}
                  className="p-2 text-slate-400 hover:bg-slate-700/50 rounded-lg"
                >
                  <BsX />
                </button>
              </div>
            </div>

            {!isBidSectionMinimized && (
              <div className="px-4 pb-4 space-y-4">
                {/* Bid Input */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 font-bold text-lg">
                      ৳
                    </span>
                    <input
                      type="text"
                      value={bidInput}
                      onChange={(e) => setBidInput(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter bid amount"
                      className="w-full bg-slate-800/80 border border-amber-500/30 pl-10 pr-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                    {bidInput && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300">
                        ৳{formatCurrency(bidInput)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleBid}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-500 hover:to-yellow-500 transition-all shadow-lg active:scale-95"
                  >
                    Place Bid
                  </button>
                </div>

                {/* Quick Bid Presets */}
                <div>
                  <p className="text-sm text-amber-500/70 mb-2">Quick Bid:</p>
                  <div className="flex flex-wrap gap-2">
                    {BID_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handlePresetBid(preset.value)}
                        className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        <span className="text-amber-300 font-bold">৳{formatCurrency(preset.value)}</span>
                        <span className="text-xs text-amber-500/70 ml-1">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message area */}
        <div    className=" relative before:absolute before:inset-0
         before:bg-[url('assets/images/bgLogo.jpg')]
         before:bg-[length:300px_200px]
         before:bg-no-repeat before:bg-center
         before:opacity-30  flex-1 overflow-y-auto p-4 md:p-8 space-y-6 z-10 custom-scrollbar">
        

          {(allMessages[activeChat.id] || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'sender' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] px-4 md:px-5 py-3 rounded-2xl shadow-xl ${
                msg.type === 'bid'
                  ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/5 border border-amber-500/50'
                  : msg.sender === 'sender' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
              }`}>
                {msg.type === 'bid' && (
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-amber-500 uppercase">
                    <BsHammer /> {msg.sender === 'sender' ? 'Your Bid' : 'Bid'}
                  </div>
                )}
                <p className={msg.type === 'bid' ? 'text-lg md:text-xl font-black text-amber-400 italic' : 'text-sm'}>
                  {msg.type === 'bid' ? `৳${formatCurrency(msg.text)}` : msg.text}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 opacity-50 text-[10px]">
                  {msg.time} {msg.sender === 'sender' && <BsCheck2All className="text-cyan-400" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
         
       
         </div>

        {/* Chat Input Footer */}
        <footer className="p-4 md:p-6 bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 z-20">
          {/* Bid Toggle Button */}
          <div className="max-w-5xl mx-auto mb-3">
            <button
              onClick={() => setShowBidSection(!showBidSection)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showBidSection 
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40' 
                  : 'bg-slate-800/50 text-slate-400 hover:text-amber-400 hover:bg-slate-800'
              }`}
            >
              <BsHammer />
              <span className="text-sm font-medium">
                {showBidSection ? 'Close Bid Section' : 'Place a Bid'}
              </span>
            </button>
          </div>

      
          {/* Message Input Form */}
          <form onSubmit={handleSend} className="max-w-5xl mx-auto flex items-center gap-2 md:gap-4">
            <div className="flex gap-1">
              <button type="button" className="p-2 md:p-3 text-slate-400 hover:text-indigo-400">
                <BsPaperclip size={18} />
              </button>
              <button type="button" className="p-2 md:p-3 text-slate-400 hover:text-indigo-400">
                <BsEmojiSmile size={18} />
              </button>
            </div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..." 
              className="flex-1 bg-slate-800/80 border border-slate-700 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm md:text-base"
            />
            <button 
              type="submit" 
              className="bg-indigo-600 p-3 md:p-4 rounded-xl md:rounded-2xl text-white hover:bg-indigo-500 shadow-lg active:scale-95"
            >
              <BsSendFill size={16} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}



































