import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import StopIcon from "@material-ui/icons/Stop";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} Text To Speech {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonGroups: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

const synth = window.speechSynthesis;

class TTS extends React.Component {
  state = {
    text: "Welcome to Text to Speech",
    buttonAccess: {
      canPause: true,
      canResume: false
    }
  };

  componentDidMount() {
    this.handlePlay();
  }

  componentWillUnmount() {
    synth.cancel();
  }

  handlePlay = () => {
    let msg = new window.SpeechSynthesisUtterance(this.state.text);
    msg.onpause = () => this.setState({ buttonAccess: {
      canPause: false,
      canResume: true
    } });
    msg.onresume = () => this.setState({ buttonAccess: {
      canPause: true,
      canResume: false
    } });
    console.log(msg);
    synth.speak(msg);
  };

  render() {
    console.log(this.state);
    const classes = this.props.classes;
    return (
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VolumeUpOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Text To Speech
          </Typography>
          <div className={classes.form}>
            <TextField
              autoFocus
              fullWidth
              multiline
              required
              variant="outlined"
              margin="normal"
              id="text"
              label="Enter the text"
              placeholder="Hello World"
              rows="4"
              name="text"
              value={this.state.text}
              onChange={e => {
                this.setState({ text: e.target.value });
              }}
            />
            <div className={classes.buttonGroups}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlayArrowIcon />}
                className={classes.submit}
                onClick={this.handlePlay}
              >
                Play
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PauseCircleOutlineIcon />}
                className={classes.submit}
                onClick={() => synth.pause()}
                disabled={!this.state.buttonAccess.canPause}
              >
                Pause
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlayArrowIcon />}
                className={classes.submit}
                onClick={() => synth.resume()}
                disabled={!this.state.buttonAccess.canResume}
              >
                Resume
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<StopIcon />}
                className={classes.submit}
                onClick={() => synth.cancel()}
              >
                Stop
              </Button>
            </div>
            {/* <div className={classes.buttonGroups}>
              <Tooltip title="Play/Pause">
                <IconButton
                  aria-label="cancel"
                  className={classes.submit}
                  onClick={this.handlePlay}
                >
                  {this.state.speaking ? (
                    <PauseIcon color="primary" fontSize="large" />
                  ) : (
                    <PlayArrowIcon color="primary" fontSize="large" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Stop">
                <IconButton
                  aria-label="cancel"
                  className={classes.submit}
                  onClick={() => {
                    synth.cancel();
                  }}
                >
                  <StopIcon color="secondary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </div> */}
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(TTS);
