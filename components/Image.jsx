import React from "react";
import NextImage from "next/image";
import Box from "@mui/material/Box";

function Image({ src, imageProps = {}, style = {}, ...rest }) {
  return (
    <Box
      className="image"
      sx={{
        "&.image > span": {
          height: "100% !important",
          width: "100% !important",
        },
        ...style,
      }}
      {...rest}
    >
      <NextImage
        src={src}
        layout="responsive"
        width="100%"
        height="100%"
        {...imageProps}
      />
    </Box>
  );
}

export default Image;
