import { Typography, Link as MUILink } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(3);

  setInterval(() => {
    setCounter(counter - 1);
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <>
      <Typography align="center" sx={{ color: 'info.main', fontWeight: "bold" }} variant="h1">
        Page Not Found
      </Typography>
      <Typography align="center">
        You will be redirected to the
        <Link href="/">
          <MUILink> Home Page </MUILink>
        </Link>{" "}
        in {counter}
      </Typography>
    </>
  );
};

export default NotFound;
