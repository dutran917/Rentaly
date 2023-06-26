import React, { useState } from "react";
import { useEffect, memo } from "react";

const CommentsFacebook = ({ id }: { id: number }) => {
  const [dataHref, setDataHref] = useState("");

  //   console.log("render CommentsFacebook");
  useEffect(() => {
    //  console.log("load facebook script");
    if (typeof window !== "undefined") {
      setDataHref(window.location.href);
    }
    const facebookScript = document.createElement("script");
    facebookScript.async = true;
    facebookScript.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`;
    document.body.appendChild(facebookScript);
  }, [id]);

  console.log(dataHref);

  return (
    <React.Fragment>
      <div id="fb-root"></div>
      <div
        className="fb-comments"
        data-href={`http://134.209.103.144:3000/rental/${id}`}
        data-numposts="10"
        data-width="100%"
      ></div>
    </React.Fragment>
  );
};

export default CommentsFacebook;
