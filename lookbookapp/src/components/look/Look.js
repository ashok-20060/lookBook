import React, {useState, useRef, useCallback, useEffect} from 'react';


const Look = props => {
    const { id, name, productLink, mediaList } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);

    const handleNext = useCallback(() => setCurrentIndex(index => (index+1)%mediaList.length),[mediaList]);

    useEffect(() => {
      let timer;
      const currentItem = mediaList[currentIndex];
      const { isVideo } = currentItem;
      const currentRef = videoRef?.current;

      if (isVideo) {
        currentRef.addEventListener("ended", handleNext); // when video ends will move to next media item
      } else {
        timer = setInterval(() => {
          handleNext();
        }, 2500); // requiremnt is 5 sec but that is too long so reducing it 
      }

      return () => {
        clearInterval(timer);
        currentRef?.removeEventListener("ended", handleNext);
      };
    }, [currentIndex, mediaList, handleNext]);


    const handleProductRedirection = useCallback(id => {
        window.open(productLink, "_blank")
    },[productLink]);

    const handlePrevItemMove = useCallback((event) => {
        event.stopPropagation()
        setCurrentIndex(index => (mediaList.length + index-1)%mediaList.length);
    },[mediaList])

    const handleNextItemMove = useCallback((event) => {
        event.stopPropagation()
        handleNext();
    },[handleNext]);

    const handleMuteToggle = useCallback((event) => {
        event.stopPropagation()
        setMuted(!muted);
        if (videoRef.current) {
            videoRef.current.muted = !muted;
          }
    },[muted])

    const currentMediaItem = mediaList[currentIndex];
    const { src,alt, isVideo } = currentMediaItem;

    return (
      <div
        title={name}
        style={{
          flexBasis: `calc(33.33% - 10px)`,
          cursor: "pointer",
          border: "1px solid black",
        }}
        onClick={() => handleProductRedirection(id)}
      >
        {isVideo ? (
          <video
            src={src}
            ref={videoRef}
            muted={muted}
            controls={false}
            autoPlay
            width={'100%'} height={'200px'} 
          />
        ) : (
          <img src={src} alt={alt} width={'100%'} height={'200px'} />
        )}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '3px'}}>
        <button onClick={handlePrevItemMove}>&lt;</button>
        <button onClick={handleNextItemMove}>&gt;</button>
        {isVideo&&<button onClick={handleMuteToggle}>{ muted ? '🔇' : '🔊'}</button>}
        </div>
      </div>
    );
}

export default Look;