import { useState } from 'react';
import AgoraRTC from 'agora-rtc-react';

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

export function VideoCall({ channelName, token }: { channelName: string; token: string }) {
  const [inCall, setInCall] = useState(false);
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  const VideoCallComponent = () => {
    // Video call implementation using Agora SDK
    return (
      <div className="video-call-container">
        <div className="remote-video"></div>
        <div className="local-video"></div>
        <button onClick={() => setInCall(false)}>End Call</button>
      </div>
    );
  };

  return (
    <div>
      {inCall ? (
        <VideoCallComponent />
      ) : (
        <button onClick={() => setInCall(true)}>Start Video Call</button>
      )}
    </div>
  );
}