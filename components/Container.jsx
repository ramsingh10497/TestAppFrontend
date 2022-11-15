import React from 'react'
import Box from '@mui/material/Box'

function Container({ children, ...rest }) {
  return (
    <Box
      maxWidth={{ sm: 720, md: 1236 }}
      width={1}
      margin="0 auto"
      paddingX={1}
      paddingY={2}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Container
