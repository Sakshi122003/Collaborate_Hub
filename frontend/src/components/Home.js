import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Button,
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import { styled, keyframes } from "@mui/material/styles";
//import { styled } from '@mui/material/styles';
import MovieIcon from "@mui/icons-material/Movie";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactIcon from "@mui/icons-material/Code";
import NodeIcon from "@mui/icons-material/Memory";
import MongoDBIcon from "@mui/icons-material/Storage";
import JWTIcon from "@mui/icons-material/VpnKey";
import StripeIcon from "@mui/icons-material/Payment";
import AWSIcon from "@mui/icons-material/Cloud";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Timeline from "./Timeline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#F5E7B2",
  color: "white",
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px #000000",
    backgroundColor: "#FF4C4C",
    "& .feature-icon": {
      transform: "scale(1.1)",
      color: "#ffa500",
    },
  },
  animation: `${pulseAnimation} 2s infinite`,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "40px",
  marginBottom: "1rem",
  color: "#03346E",
  transition: "all 0.3s ease-in-out",
}));

const CircularBenefitItem = ({ number, title, description, icon }) => (
  <Box
    sx={{
      position: "relative",
      width: 250, // Increased from 250
      height: 250, // Increased from 250
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "2px solid #FFD700",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          right: "-10px",
          width: 0,
          height: 0,
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderLeft: "15px solid #FFD700",
          transform: "translateY(-50%)",
        },
      }}
    />
    <Typography
      variant="h5"
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        bgcolor: "#FFD700",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </Typography>
    <SvgIcon component={icon} sx={{ fontSize: 40, mb: 2, color: "#180161" }} />
    <Typography
      variant="h6"
      align="center"
      gutterBottom
      sx={{ px: 3, color: "#173B45", fontFamily: "Roboto, sans-serif" }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      align="center"
      sx={{
        px: 3,
        color: "red",
        fontSize: 18, // Reduced from 30
        lineHeight: 1.2,
        height: 60, // Fixed height for 3 lines
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3, // Limit to 3 lines
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {description}
    </Typography>
  </Box>
);

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000); // Change this value to adjust the slideshow speed (in milliseconds)
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "600px" }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Button
        onClick={goToPrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.5)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Button
        onClick={goToNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.5)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};
const AnimatedTitle = ({ text }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 200);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontFamily: "Roboto, sans-serif",
        fontWeight: "bold",
        color: "#FF4C4C",
      }}
    >
      {text.substring(0, index)}
      <span style={{ borderRight: "2px solid #fff" }}></span>
    </Typography>
  );
};

const Section = ({ id, title, content, innerRef }) => (
  <Box id={id} className="section" sx={{ color: "black" }} ref={innerRef}>
    <Typography
      variant="h4"
      gutterBottom
      sx={{ color: "inherit", fontFamily: "Roboto, sans-serif" }}
    >
      {title}
    </Typography>
    <Box sx={{ color: "inherit" }}>{content}</Box>
  </Box>
);

const FeatureCard = ({ icon: IconComponent, title, description }) => (
  <StyledCard>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <IconWrapper className="feature-icon">
        <IconComponent fontSize="inherit" />
      </IconWrapper>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="#173B45"
        sx={{ fontSize: "1.1rem", fontFamily: "Roboto, sans-serif" }}
      >
        {description}
      </Typography>
    </CardContent>
  </StyledCard>
);

const FlipCardContainer = styled(Box)(({ theme }) => ({
  perspective: "1000px",
  width: "100%",
  height: "300px",
  cursor: "pointer",
}));

const FlipCardInner = styled(Box)(({ flipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  fontFamily: "Roboto, sans-serif",
}));

const FlipCardSide = styled(Card)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  fontFamily: "Roboto, sans-serif",
}));

const FlipCardFront = styled(FlipCardSide)(({ theme }) => ({
  backgroundColor: "#FFBF78",
  color: "#180161",
  fontFamily: "Roboto, sans-serif",
}));

const FlipCardBack = styled(FlipCardSide)(({ theme }) => ({
  backgroundColor: "#FF4C4C",
  color: "white",
  transform: "rotateY(180deg)",
  overflowY: "auto",
  fontFamily: "Roboto, sans-serif",
}));

const FlipCard = ({ title, content }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <FlipCardContainer onClick={() => setIsFlipped(!isFlipped)}>
      <FlipCardInner flipped={isFlipped}>
        <FlipCardFront>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontFamily: "Roboto, sans-serif" }}
            >
              {title}
            </Typography>
          </CardContent>
        </FlipCardFront>
        <FlipCardBack>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Roboto, sans-serif" }}
            >
              {title}
            </Typography>
            <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
              {content.map((item, index) => (
                <li key={index}>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCardContainer>
  );
};

const LanguageItem = ({ icon: Icon, title, description }) => (
  <Grid
    item
    xs={6}
    sm={4}
    md={2}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Avatar sx={{ width: 80, height: 80, bgcolor: "orange", mb: 2 }}>
      <Icon sx={{ fontSize: 40, color: "beige" }} />
    </Avatar>
    <Typography
      variant="subtitle1"
      gutterBottom
      sx={{ fontSize: 30, color: "#3d0c02", fontFamily: "Roboto, sans-serif" }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      sx={{ fontSize: 20, color: "#3d0c02", fontFamily: "Roboto, sans-serif" }}
    >
      {description}
    </Typography>
  </Grid>
);

const Home = () => {
  const featuresRef = React.useRef(null);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/personal-data");
  };

  const sections = [
    {
      id: "title",
      content: (
        <Box
          className="hero-section"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              className="hero-text"
              color="black"
              sx={{ fontFamily: "Roboto, sans-serif" }}
            >
              <AnimatedTitle text=" Your Gateway to Endless Entertainment" />
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#FFB22C", mt: 2 }}
              >
                Unlock the power of emerging and established brands with a
                multi-unit footprint
              </Typography>
              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mr: 2,
                    background: "yellow",
                    backdropFilter: "blur(10px)",
                    fontFamily: "Roboto, sans-serif",
                  }}
                  onClick={handleJoinNow}
                >
                  Join now
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "red",
                    fontFamily: "Roboto, sans-serif",
                  }}
                  size="large"
                  onClick={() =>
                    featuresRef.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Features
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="hero-image-container">
              <Box className="hero-image-circle">
                <img
                  src="https://i.pinimg.com/originals/b6/6f/72/b66f7213a8cbc806b9b7461cba44095c.gif"
                  alt="Location Intelligence"
                  className="hero-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    // ... other sections ...
    {
      id: "description",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Description
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: 20, px: 6, fontFamily: "Roboto, sans-serif" }}
          >
            Our project aims to develop a comprehensive entertainment booking
            platform, featuring three distinct panels:{" "}
            <span>
              <strong>Admin, Theatre, and User.</strong>
            </span>
            This platform will cater to a wide range of entertainment events,
            including movies, plays, concerts, and comedy shows. The system is
            designed to provide seamless interaction between users, theatre
            managers, and the admin, ensuring an efficient and user-friendly
            experience.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ fontFamily: "Roboto, sans-serif" }}>
              <FlipCard
                title="USER PANEL"
                content={[
                  "Register/Login: Access the platform's features.",
                  "Book Events: Tickets for movies, plays, concerts, and more.",
                  "Event Details: Descriptions, schedules, and prices.",
                  "Watch Trailers: Embedded YouTube links.",
                  "Booking History: Manage your tickets.",
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ fontFamily: "Roboto, sans-serif" }}>
              <FlipCard
                title="THEATRE PANEL"
                content={[
                  "Manage Listings: Theatre managers can log in to manage listings.",
                  "Add Events: Add new shows with timing, prices, and descriptions.",
                  "Manage Bookings: Track and manage event bookings.",
                  "User Details: Access information about ticket buyers.",
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ fontFamily: "Roboto, sans-serif" }}>
              <FlipCard
                title="ADMIN PANEL"
                content={[
                  "Admin Access: Secure login for all platform functionalities.",
                  "Theatre Management: Add theatres and assign manager credentials.",
                  "Monitor Activities: Oversee bookings, handle complaints, and ensure smooth operations.",
                ]}
              />
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      id: "languages",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            LANGUAGES
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ fontFamily: "Roboto, sans-serif" }}
        >
          <LanguageItem
            icon={ReactIcon}
            title="React.js"
            description="For a responsive and interactive UI"
          />
          <LanguageItem
            icon={NodeIcon}
            title="Node.js"
            description="With Express for robust API development"
          />
          <LanguageItem
            icon={MongoDBIcon}
            title="MongoDB"
            description="For flexible data storage"
          />
          <LanguageItem
            icon={JWTIcon}
            title="JWT"
            description="For secure user sessions"
          />
          <LanguageItem
            icon={StripeIcon}
            title="Stripe"
            description="For safe and easy transactions"
          />
          <LanguageItem
            icon={AWSIcon}
            title="AWS"
            description="For scalable cloud infrastructure"
          />
        </Grid>
      ),
    },

    {
      id: "features",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            FEATURES
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <Grid container spacing={4} sx={{ fontFamily: "Roboto, sans-serif" }}>
          {[
            {
              icon: MovieIcon,
              title: "Diverse Event Booking",
              description:
                "Book tickets for movies, plays, concerts, and comedy shows all in one place.",
            },
            {
              icon: PlaylistPlayIcon,
              title: "Trailer Previews",
              description:
                "Watch trailers on YouTube directly from the event pages for an informed decision.",
            },
            {
              icon: TheaterComedyIcon,
              title: "Theatre Management",
              description:
                "Theatres can manage their shows, schedules, and ticket prices effortlessly.",
            },
            {
              icon: AccountCircleIcon,
              title: "User Management",
              description:
                "Users can easily register, login, and track their booking history.",
            },
            {
              icon: AdminPanelSettingsIcon,
              title: "Admin Control",
              description:
                "Admins oversee the entire platform, adding theatres and ensuring smooth operations.",
            },
            {
              icon: NotificationsIcon,
              title: "Real-time Notifications",
              description:
                "Stay updated with real-time notifications about booking statuses and event updates.",
            },
          ].map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      ),
      innerRef: featuresRef,
    },
    {
      id: "visual",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            VISUAL
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <>
          <ImageSlideshow
            images={[
              "/image1.png",
              "/image2.png",
              "/image3.png",
              "/image4.png",
            ]}
          />
        </>
      ),
    },
    {
      id: "benefits/aspects",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            BENEFITS & ASPECTS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            fontFamily: "Roboto, sans-serif",
          }}
        >
          <CircularBenefitItem
            number="01"
            title="All-in-One"
            description="Buy tickets for various events in one place"
            icon={EventAvailableIcon}
          />
          <CircularBenefitItem
            number="02"
            title="Easy Theatre Management"
            description="Manage events and pricing effortlessly"
            icon={TheaterComedyIcon}
          />
          <CircularBenefitItem
            number="03"
            title="Instant Updates"
            description="Get real-time notifications and updates"
            icon={NotificationsIcon}
          />
          <CircularBenefitItem
            number="04"
            title="Admin Oversight"
            description="Monitor and manage platform operations efficiently"
            icon={AdminPanelSettingsIcon}
          />
        </Box>
      ),
    },
    {
      id: "milestones",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 800,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            MILESTONES
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <>
          <Box sx={{ margin: "-24px" }}></Box>
          <Timeline />
        </>
      ),
    },
    {
      id: "faq",
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 2,
              fontWeight: 700,
              color: "red",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              ml: 2,
            }}
          >
            <Box sx={{ borderTop: "1px solid red", mb: 1.0 }} />
            <Box sx={{ borderTop: "1px solid red" }} />
          </Box>
        </Box>
      ),
      content: (
        <Box>
          <Box
            sx={{
              mt: 2,
              bgcolor: "lightyellow",
              color: "#180161",
              boxShadow: "0px 8px 16px rgba(255, 0, 0, 0.3)", // Wider light red shadow
              borderRadius: "8px", // Optional: To give rounded corners
              fontFamily: "Roboto, sans-serif",
            }}
          >
            {[
              {
                question: "What is the main goal of this project?",
                answer:
                  "The main goal of this project is to bring together talented individuals to collaborate on a unique and innovative initiative. We aim to leverage diverse skills and perspectives to create something truly impactful and meaningful.",
              },
              {
                question: "How can I join the project as a collaborator?",
                answer:
                  "To join the project, simply visit our website, read through the project details, and click on the --Join Me-- button. You'll be directed to a form where you can register your interest and provide some basic information about your skills and experience.",
              },
              {
                question: "What kind of collaborators are you looking for?",
                answer:
                  "We are looking for collaborators with a wide range of skills, including development, design, marketing, and more. If you have a passion for innovation and are excited about the project's goals, we encourage you to apply!",
              },
              {
                question: "Is there any cost involved in joining the project?",
                answer:
                  "No, there is no cost involved in joining the project. We are looking for passionate individuals who are willing to contribute their skills and collaborate towards a common goal. The project is a great opportunity for professional growth and networking.",
              },
            ].map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 1,
                  "&:before": { display: "none" },
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <IconButton size="small" sx={{ color: "red" }}>
                      {expanded === `panel${index}` ? (
                        <RemoveIcon />
                      ) : (
                        <AddIcon />
                      )}
                    </IconButton>
                  }
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    "& .MuiAccordionSummary-content": { margin: "10px 0" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    fontSize={20}
                    sx={{ color: "#180161", fontFamily: "Roboto, sans-serif" }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body2"
                    fontSize={20}
                    sx={{ color: "#A91D3A", fontFamily: "Roboto, sans-serif" }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <div className="home">
      <div></div>
      <Navbar />
      <Container maxWidth="lg">
        {sections.map((section) => (
          <Section key={section.id} {...section} />
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
