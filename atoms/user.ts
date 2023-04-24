import { atom } from "jotai";
import { User as NetlifyUser } from "netlify-identity-widget";

const User = {
  name: "",
  image: { public_id: "" },
  isUploading: false,
  isLoggedIn: false,
};

export const userAtom = atom(User);
