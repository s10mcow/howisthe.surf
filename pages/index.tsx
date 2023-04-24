import MenuAppBar from "@components/AppBar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Player from "@/components/Player/index";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { ForecastWidget } from "@components/ForecastWidget";
import { useRouter } from "next/router";
import { getCurrentBeachesAtom } from "@/atoms/beaches";
import { useAtom } from "jotai";
import { camerasAtom } from "@/atoms/cameras";

export default function Home() {
  const [cameras, setCameras] = useAtom(camerasAtom);
  const players = cameras.length === 1 ? "players players--single" : "players";
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [beaches] = useAtom(getCurrentBeachesAtom);
  console.log(beaches);
  const setSelectedFeedback = (selectedFeedback) => true;
  //dispatch(actions.setSelectedFeedback.trigger(selectedFeedback));

  const showFeedbackInPlayer = (name) => {
    setSelectedFeedback(name);
    router.push("/feedback");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const buyBeer = () => {
    const a = document.createElement("a");
    a.href = "https://www.paypal.com/paypalme2/powdertothepeopletv";
    a.target = "_blank";
    a.click();
    setOpen(false);
  };

  const addNewCamera = () => {
    setCameras((prev) => [...prev, beaches[0]]);
  };

  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  return (
    <>
      <Head>
        <title>howisthe.surf</title>
        <meta name="description" content="Surf cams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MenuAppBar />

      <div className="players__wrapper">
        <Dialog
          className="players__wrapper__dialog"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We all hate ads.
              <br /> Thats why we're here.
              <br /> If you like what you see.
              <br /> Buy me a beer...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No thanks.</Button>
            <Button onClick={buyBeer} color="primary">
              Hell yeah!
            </Button>
          </DialogActions>
        </Dialog>
        <section className={players}>
          {cameras.map((camera, index) => (
            <Player
              key={index}
              index={index}
              name={camera.name}
              url={camera.url}
              beachNames={beaches}
              showFeedback={showFeedbackInPlayer}
            />
          ))}
        </section>
        <Button color="primary" onClick={addNewCamera}>
          Add Camera
        </Button>
        <ForecastWidget />
      </div>
    </>
  );
}
