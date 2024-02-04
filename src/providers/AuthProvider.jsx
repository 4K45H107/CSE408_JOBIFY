"use client";

import React, { useState, useEffect } from "react";

const AuthProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <main>{children}</main>;
  }
};

export default AuthProvider;
