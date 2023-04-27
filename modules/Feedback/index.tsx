import { Home } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
import MediaCard, { NoMediaCard } from "@components/MediaCard";
import Slide from "@mui/material/Slide";
import { FeedbackContainer, MediaList } from "./styles";

import { useUser } from "@auth0/nextjs-auth0/client";

const Transition = React.forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

//@ts-ignore
const Feedback = ({ toggle, name }) => {
  const [image, setImage] = useState("");
  const [media, setMedia] = useState([]);
  // const [media] = useAtom(getAllMedia);
  const [isFetchingMedia, setFetching] = useState(false);
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    async function getMedia() {
      //TODO:FetchallMedia
      setFetching(true);
      await fetch("/api/getAllMedia").then((res) => {
        res.json().then((data) => {
          console.log("FetchallMedia", data.allMedia);
          setMedia(data.allMedia);
        });
      });
      setFetching(false);
    }
    getMedia();
  }, []);

  //@ts-ignore
  const createMedia = (file) => {
    const mediaUrl = URL.createObjectURL(file);
    setImage(mediaUrl);
    //TODO:createMedia
    //dispatch(actions.createMedia.trigger({ file, tags: name }));
  };

  return (
    <>
      {/* 
      TODO: Get Updload with feedback working
      <Dialog
        fullScreen
        aria-labelledby="simple-dialog-title"
        open={createMediaWorking}
        TransitionComponent={Transition}
      >
        <UploadingImageWrapper>
          <UploadingImage url={image} />
          {createMediaProgress > 0 && createMediaProgress < 100 ? (
            <CircularProgress
              className="CircularProgress"
              variant="determinate"
              value={createMediaProgress}
            />
          ) : (
            <CircularProgress className="CircularProgress" />
          )}
        </UploadingImageWrapper>
      </Dialog> */}
      <FeedbackContainer>
        {isFetchingMedia ? (
          <CircularProgress />
        ) : (
          <MediaList>
            {media?.map(({ data }) =>
              //@ts-ignore
              data.resource_type === "image" ? (
                //@ts-ignore
                <MediaCard key={data.public_id} data={data} />
              ) : (
                // <Video
                //   key={data.public_id}
                //   controls
                //   publicId={`${data.public_id}.gif`}
                //   resourceType={data.resource_type}
                // >
                //   <Transformation
                //     audioCodec="none"
                //     flags="animated"
                //     quality="auto"
                //   />
                // </Video>
                //@ts-ignore
                <div key={data.public_id}>imavid</div>
              )
            )}
            {media && media.length === 0 && (
              <NoMediaCard>
                <p>No images here!</p>
                <p>Log in and get some media moving!</p>
              </NoMediaCard>
            )}
          </MediaList>
        )}

        <footer className="feedback__footer">
          <Button className="feedback__back" onClick={toggle}>
            <Home />
          </Button>
          {/* {isLoggedIn && (
            <FilePicker
              maxSize={10}
              dims={{ minWidth: 100, minHeight: 100 }}
              onChange={createMedia}
              onError={(errMsg) => console.log(errMsg)}
            >
              <Button className="feeback__camera">
                <CameraAlt />
              </Button>
            </FilePicker>
          )} */}
        </footer>
      </FeedbackContainer>
    </>
  );
};

export default Feedback;
