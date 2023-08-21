"use client";

import { useState, useEffect } from "react";

const useUser = (props: { redirectTo: string }) => {
  const { redirectTo } = props;

  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const exist = localStorage.getItem("user");
    !!exist ? setUser(true) : setUser(false);
  }, [redirectTo]);

  return { user };
};

export default useUser;
