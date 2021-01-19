import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    // minHeight: "300px",
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ReactAlbum(props) {
  const cards = props.images;
  const cardActions = props.cardActions;
  const classes = useStyles();

  return (
    <Grid justify="center" container spacing={1}>
      {cards.map((card, index) => (
        <Grid item key={card} xs={9} sm={6}>
          <Card className={classes.card}>
            <CardActionArea
              onClick={() => {
                console.log("asdasd");
              }}
            >
              <CardMedia
                className={classes.cardMedia}
                image={card}
                title="Image title"
              />
            </CardActionArea>

            {cardActions(index)}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
