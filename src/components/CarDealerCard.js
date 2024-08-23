import React, { memo } from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography, useMediaQuery } from '@mui/material';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import { useTheme } from '@mui/material/styles';

const CarDealerCard = memo(({ dealer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} key={dealer.id}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="space-between"
          >
            {/* Logo  */}
            <Box
              sx={{
                minWidth: 70, // This width ensures alignment of the middle info section
                display: 'flex',
                justifyContent: isMobile ? 'flex-start' : 'center',
              }}
            >
              <Avatar
                src={dealer.logo}
                alt={dealer.name}
                sx={{ width: 56, height: 56, marginRight: isMobile ? 0 : 2, marginBottom: isMobile ? 2 : 0 }}
              />
            </Box>

            {/*  middle info */}
            <Box display="flex" flexDirection="column" mb={isMobile ? 2 : 0} flexGrow={1}>
              <Typography variant="h6" component="div">
                {dealer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {dealer.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {dealer.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City: {dealer.city}
              </Typography>
            </Box>

            {/* Rating and comment info */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems={isMobile ? 'flex-start' : 'flex-end'}
              mt={isMobile ? 2 : 0}
            >
              <Box display="flex" alignItems="center">
                <Rating name="simple-controlled" value={dealer.rating_score} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 0.5 }}>
                  ({dealer.rating_count})
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <CommentIcon />
                <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 0.5 }}>
                  ({dealer.comments_count})
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default CarDealerCard;
