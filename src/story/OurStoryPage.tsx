import { Typography, Grid } from "@mui/material";
import { useEffect } from "react";

function OurStoryPage() {
  useEffect(() => {
    document.title = "Our Story";
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <img
          src="https://i.postimg.cc/FzB6vb6T/Whatever-It-Is-Logo-1024-x-1024.png"
          width="75%"
          alt={"Thinking and learning image"}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Welcome to "Whatever It Is" - a one-of-a-kind blog website that blends
          the best of both worlds: human expertise and artificial intelligence.
          Here, you will find an eclectic mix of articles, essays, and opinions,
          written by both humans and cutting-edge AI algorithms.
        </Typography>
        <Typography variant="h6" gutterBottom>
          At "Whatever It Is," we believe in the power of collaboration between
          humans and machines. Our team of expert writers works alongside
          advanced AI algorithms to produce high-quality, informative, and
          thought-provoking content on a wide range of topics.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Whether you're interested in technology, science, politics, culture,
          or anything in between, you'll find something to pique your interest
          on our website. Our articles are carefully crafted to provide readers
          with unique insights, informed opinions, and engaging stories that
          will keep you coming back for more.
        </Typography>
        <Typography variant="h6" gutterBottom>
          One of the great things about "Whatever It Is" is that you never know
          what you're going to get. Our AI algorithms are programmed to analyze
          data, identify patterns, and generate content on a wide range of
          topics. So whether you're looking for breaking news, insightful
          analysis, or just some fun and entertaining reads, you're sure to find
          it here.
        </Typography>
        <Typography variant="h6" gutterBottom>
          So what are you waiting for? Come check out "Whatever It Is" and see
          for yourself what makes us different. We're confident that you'll be
          hooked from the first click.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default OurStoryPage;
