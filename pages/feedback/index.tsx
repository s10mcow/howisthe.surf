import React from "react";
import Feedback from "@modules/Feedback";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  dialog: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default function FeedbackDialog() {
  const classes = useStyles();
  const router = useRouter();
  const closeFeedback = () => {
    router.push("/");
  };

  return (
    <Dialog fullScreen open={true} onClose={closeFeedback}>
      <DialogContent className={classes.dialog}>
        <Feedback name={"sten"} toggle={closeFeedback} />
      </DialogContent>
    </Dialog>
  );
}
