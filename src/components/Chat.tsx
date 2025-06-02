import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function Chat({ recipientId }: { recipientId: string }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user, tokens } = useAuthStore();

  const sendMessage = async () => {
    if (tokens < 1) {
      alert('Not enough tokens! Please purchase more.');
      return;
    }

    await supabase.from('messages').insert({
      sender_id: user.id,
      recipient_id: recipientId,
      content: newMessage,
    });

    // Deduct token
    await supabase.rpc('deduct_token', { user_id: user.id });
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg: any) => (
          <div key={msg.id} className="message">
            {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}