"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/conn";
import { AuthContext } from "@/contexts/AuthContext";
import NotificationCard from "@/components/notification/notificationCard";
import axios from "axios";

const Notification = () => {
  const [activeId, setActiveId] = useState("");
  const [read, setRead] = useState(false);

  const { role, userId } = useContext(AuthContext);

  const { data: notifications, isLoading } = useSWR(
    `/api/notification/getNotification/employer?employerId=${userId}`,
    fetcher, {refreshInterval: 100}
  );
  console.log(notifications);
  const [notList, setNotList] = useState([]);

  useEffect(() => {
    setNotList(notifications);
  }, [notifications]);

  useEffect(() => {
    handleRead();
  }, [read]);

  const handleRead = async () => {
    const abc = {
      id: activeId,
    };
    
    try {
      const res = await axios.patch("/api/notification/markAsRead", abc);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading) {
    return (
      <div className="flex gap-x-4 mt-16">
        <div className="w-3/4 h-[400px] overflow-auto px-4">
          <label className="text-red-500">Notifications</label>
          {notList?.map((notification) => (
            <NotificationCard
              key={notification._id}
              id={notification._id}
              message={notification.message}
              type={notification.type}
              read={notification.read}
              data={notification.data}
              setRead={setRead}
              setActiveId={setActiveId}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Notification;
