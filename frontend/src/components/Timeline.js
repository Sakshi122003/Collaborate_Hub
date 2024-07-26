import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Grid } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

const TimelineItem = ({ date, title, description, isHighlighted }) => (
  <Box
    sx={{
      display: "flex",
      mb: 4,
      p: 2,
      transition: "background-color 0.3s",
      backgroundColor: isHighlighted ? "rgba(255, 215, 0, 0.1)" : "transparent",
      borderRadius: 2,
    }}
  >
    <Box
      sx={{
        mr: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TimelineIcon sx={{ color: "#FFD700", fontSize: 40 }} />
      <Box sx={{ width: 2, flexGrow: 1, bgcolor: "#FFD700", my: 1 }} />
    </Box>
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#173B45", fontFamily: "Roboto, sans-serif" }}
      >
        {date}
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: "#180161", mb: 1, fontFamily: "Roboto, sans-serif" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#A91D3A", fontFamily: "Roboto, sans-serif" }}
      >
        {description}
      </Typography>
    </Box>
  </Box>
);

const Timeline = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);
  const milestones = [
    {
      date: "Q3 2023",
      title: "Project Kickoff",
      description:
        "Initial planning and team formation for the entertainment booking platform.",
    },
    {
      date: "Q4 2023",
      title: "Backend Development",
      description:
        "Development of the core backend infrastructure using Node.js and MongoDB.",
    },
    {
      date: "Q1 2024",
      title: "Frontend Development",
      description:
        "Creation of the user interface for all three panels using React.js.",
    },
    {
      date: "Q2 2024",
      title: "Integration and Testing",
      description:
        "Integration of all components and comprehensive testing of the platform.",
    },
    {
      date: "Q3 2024",
      title: "Beta Launch",
      description:
        "Limited release to gather user feedback and make final adjustments.",
    },
    {
      date: "Q4 2024",
      title: "Official Launch",
      description: "Full public release of the entertainment booking platform.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setInterval(() => {
        setHighlightedIndex((prevIndex) =>
          prevIndex === milestones.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [isVisible, milestones.length]);

  return (
    <Box ref={timelineRef}>
      {milestones.map((milestone, index) => (
        <TimelineItem
          key={index}
          {...milestone}
          isHighlighted={isVisible && index === highlightedIndex}
        />
      ))}
    </Box>
  );
};

export default Timeline;
