import React from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import Webcam from 'react-webcam';

//이것도 화면 아니면 오디오 구현
function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      border='1px solid black'
      controls
    />
  );
}


//화면 구현
function LiveStreamPreview({ stream }) {
    let videoPreviewRef = React.useRef();
  
    React.useEffect(() => {
      if (videoPreviewRef.current && stream) {
        videoPreviewRef.current.srcObject = stream;
      }
    }, [stream]);
  
    if (!stream) {
      return null;
    }
  
    return <video ref={videoPreviewRef} width={520} height={480} autoPlay />;
}
  
  

export default function ScreenRecorderApp() {
  let {
    error,
    status,

    mediaBlob,
    liveStream,
    getMediaStream,

    startRecording,
    pauseRecording, 
    resumeRecording, 
    stopRecording

  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  return (
    <article style={{marginLeft:'30px'}}>
        <h1>Screen recorder</h1>
        <Webcam
            ref={liveStream}
            audio={true}
            style={{ width: '50%', height: '50%', display: 'block', border:'1px solid', marginBottom:'30px'}}
        />

        <LiveStreamPreview stream={liveStream} />

        <Player srcBlob={mediaBlob} />


        {error ? `${status} ${error.message}` : status}
        <section>
            <button
            type="button"
            onClick={getMediaStream}
            disabled={status === 'ready'}
            >
            Share screen
            </button>
            <button
            type="button"
            onClick={startRecording}
            disabled={status === 'recording'}
            >
            Start recording
            </button>
            <button
            type="button"
            onClick={stopRecording}
            disabled={status !== 'recording'}
            >
            Stop recording
            </button>
        </section>
        
    </article>
  );
}
