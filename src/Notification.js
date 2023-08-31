import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { requestPermission, onMessageListener } from "./firebase";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  console.log(notification, "notification");
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload?.notification.title,
          body: payload?.notification.body,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });

    return () => {
      unsubscribe.catch((error) => console.log("failed : ", error));
    };
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default Notification;
