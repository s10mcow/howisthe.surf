import React, { useState, useEffect, useRef, useCallback } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import ReactGA from "react-ga";
import { Button } from "@material-ui/core";
import { useAtom } from "jotai";
import { camerasAtom } from "@/atoms/cameras";

interface Beach {
  url: string;
  name: string;
}

interface PlayerProps {
  url: string;
  name: string;
  index: number;
  beachNames: Beach[];
  showFeedback: (name: string) => void;
}

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 20px;
  }
`;

const Player: React.FC<PlayerProps> = ({
  url,
  name,
  index,
  beachNames,
  showFeedback,
}) => {
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [showError, setShowError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [_, setCameras] = useAtom(camerasAtom);

  const deleteCamera = (index: number) => {
    setCameras((prev) => {
      const newCameras = [...prev];
      newCameras.splice(index, 1);
      return newCameras;
    });
  };
  const updateCamera = ({
    index,
    url,
    name,
  }: {
    index: number;
    url: string;
    name: string;
  }) => {
    setCameras((prev) => {
      const newCameras = [...prev];
      newCameras[index] = { url, name };
      return newCameras;
    });
  };

  const deleteHandler = () => {
    if (hlsInstance && hlsInstance.destroy) hlsInstance.destroy();
    setHlsInstance(null);
    deleteCamera(index);
  };

  useEffect(() => {
    setShowError(false);
    if (Hls.isSupported()) {
      let beachHls = new Hls();
      beachHls.loadSource(url);
      beachHls.attachMedia(videoRef.current as HTMLVideoElement);
      beachHls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) videoRef.current.play();
      });
      beachHls.on(Hls.Events.ERROR, (event, err) => {
        console.log(err);
        if (err.response && err.response.code === 404) {
          setShowError(true);
          beachHls.destroy();
        }
      });
      setHlsInstance(beachHls);
    } else {
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.play();
      }
    }
  }, [url]);

  const changeCamera = (index: number, camera: string) => {
    if (camera === "suggest_new_camera") {
      const a = document.createElement("a");
      a.href =
        "mailto:powdertothepeeps@gmail.com?subject=New Camera Suggestion";
      a.target = "_blank";
      a.click();
    } else {
      const { url, name } = JSON.parse(camera);
      updateCamera({ index, url, name });
      ReactGA.event({
        category: "Camera Player",
        action: "Change Camera",
        label: url,
      });
    }
  };

  const footer = (
    <div className="player__footer__uncollapsed">
      <Select
        value={JSON.stringify({ url, name })}
        onChange={(event) => changeCamera(index, event.target.value as string)}
      >
        {beachNames.map((beach, key) => (
          <StyledMenuItem
            key={key}
            value={JSON.stringify({ url: beach.url, name: beach.name })}
          >
            {beach.name}
          </StyledMenuItem>
        ))}
        <StyledMenuItem key="suggest_new_camera" value="suggest_new_camera">
          * Suggest New Camera *
        </StyledMenuItem>
      </Select>
    </div>
  );

  const playerContent = showError ? (
    <main className="player__error">
      <div>Camera offline.</div>
    </main>
  ) : (
    <main className="player__content">
      <Fab
        className="player__delete"
        color="secondary"
        aria-label="remove"
        onClick={deleteHandler}
      >
        <CloseIcon />
      </Fab>
      <video ref={videoRef} autoPlay controls />
    </main>
  );
  return (
    <Card className="player">
      {playerContent}
      <CardActions className="player__footer">{footer}</CardActions>
      <Button color="secondary" onClick={() => showFeedback(name)}>
        How was it?
      </Button>
    </Card>
  );
};

export default Player;
