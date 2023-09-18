"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  function handler() {}
  return (
    <Button color="primary" variant="shadow" isLoading={isLoading}>
      Hey
    </Button>
  );
}

export default SignIn;
